import { z } from 'zod';

import { authProcedure, openProcedure } from '../procedure';
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
});
