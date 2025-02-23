import type { TRPCClientErrorLike } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { exampleRouter } from "./example";
import { router } from "../router";

export const appRouter = router({
	example: exampleRouter,
});

export type AppRouter = typeof appRouter;

export type TRPCClientError = TRPCClientErrorLike<AppRouter>;
export type API = {
	input: inferRouterInputs<AppRouter>;
	output: inferRouterOutputs<AppRouter>;
};
