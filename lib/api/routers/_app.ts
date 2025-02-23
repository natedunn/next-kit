import type { TRPCClientErrorLike } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { router } from '../router';
import { exampleRouter } from './example';

export const appRouter = router({
	example: exampleRouter,
});

export type AppRouter = typeof appRouter;

export type TRPCClientError = TRPCClientErrorLike<AppRouter>;
export type API = {
	input: inferRouterInputs<AppRouter>;
	output: inferRouterOutputs<AppRouter>;
};
