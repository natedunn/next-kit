import type { NextRequest } from 'next/server';

import { cache } from 'react';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, username } from 'better-auth/plugins';
import * as H from 'next/headers';

import { db } from '@/lib/db';

import { userSchema } from '../db/schema/auth';
import { env } from '../env/server';

// This is the entry point
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
	}),
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
			mapProfileToUser: async (profile) => {
				return {
					username: profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: env.ADMIN_EMAIL === profile.email ? 'admin' : 'user',
				};
			},
		},
	},
	plugins: [nextCookies(), admin(), username()],
	user: {
		additionalFields: {
			// This purely exists to make sure the username is required
			username: {
				type: 'string',
				required: true,
				sortable: true,
				unique: true,
				returned: true,
				transform: {
					input(value) {
						return value?.toString().toLowerCase();
					},
				},
			},
		},
	},
});

export const getAuth = cache(async (passedHeaders?: NextRequest['headers']) => {
	const headers = passedHeaders ?? (await H.headers());

	const session = await auth.api.getSession({
		headers,
	});

	return {
		session: session?.session ?? null,
		user: session?.user ? userSchema.read.parse(session.user) : null,
	};
});
