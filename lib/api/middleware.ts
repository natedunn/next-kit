import { TRPCError } from '@trpc/server';

import { t } from '@/lib/api/init';

export const isAuthed = t.middleware(async ({ ctx, next }) => {
	const { session, user } = ctx.auth;

	if (!session || !user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Not authenticated',
		});
	}

	return next({
		ctx: {
			...ctx,
			auth: {
				session,
				user,
			},
		},
	});
});

export const isAdmin = t.middleware(async ({ ctx, next }) => {
	const { session, user } = ctx.auth;
	if (!session || !user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'User is not authenticated',
		});
	}

	if (user.role !== 'admin') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'User is not an admin',
		});
	}

	return next({
		ctx: {
			...ctx,
			auth: {
				session,
				user,
			},
		},
	});
});
