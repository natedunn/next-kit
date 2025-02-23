import { betterAuth, Session, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { admin, username } from "better-auth/plugins";
import { env } from "../env/server";
import { nextCookies } from "better-auth/next-js";
import { NextRequest } from "next/server";
import { cache } from "react";
import { userSchema, UserSchema } from "../db/schema/auth";
import * as H from "next/headers";

// This is the entry point
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
	}),
	socialProviders: {
		// Optional
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
			mapProfileToUser: async (profile) => {
				return {
					username: profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: env.ADMIN_EMAIL === profile.email ? "admin" : "user",
				};
			},
			// redirectURI: `${getBaseUrl()}/authed`,
		},
	},
	plugins: [nextCookies(), username()],
	user: {
		additionalFields: {
			// This purely exists to make sure the username is required
			username: {
				type: "string",
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

export const getAuth = cache(async (passedHeaders?: NextRequest["headers"]) => {
	const headers = passedHeaders ?? (await H.headers());

	const session = await auth.api.getSession({
		headers,
	});

	return {
		session: session?.session ?? null,
		user: session?.user ? userSchema.read.parse(session.user) : null,
	};
});
