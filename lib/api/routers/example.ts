import { TRPCError } from '@trpc/server';
import consola from 'consola';
import { z } from 'zod';

import { auth } from '@/lib/auth/auth';
import { authClient } from '@/lib/auth/auth-client';

import { adminProcedure, authProcedure, openProcedure } from '../procedure';
import { router } from '../router';

export const exampleRouter = router({
	open: openProcedure.input(z.string()).query(async ({ input, ctx }) => {
		const date = new Date();
		return {
			passedInput: input,
			date: date.toLocaleString(),
			user: !ctx.auth.user?.email ? null : `${ctx.auth.user.email} (not required)`,
		};
	}),
	authed: authProcedure.input(z.string()).query(async ({ input, ctx }) => {
		const date = new Date();
		return {
			passedInput: input,
			date: date.toLocaleString(),
			user: `${ctx.auth.user.email} (required)`,
		};
	}),
	listUsers: adminProcedure.query(async ({ ctx }) => {
		const user = ctx.auth.user;

		const { data } = await authClient.admin.listUsers({
			query: {
				limit: 10,
			},
			fetchOptions: {
				headers: ctx.req.headers,
			},
		});

		return {
			adminEmail: user.email,
			allUsers: data?.users,
		};
	}),
});
