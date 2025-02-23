import type { NextRequest } from "next/server";

import { cache } from "react";
import * as H from "next/headers";

// import { validateAuthRequest } from "@/lib/auth/utils";
import { t } from "@/lib/api/init";
import { createInnerTRPCContext } from "@/lib/api/context";
import { appRouter } from "@/lib/api/routers/_app";
import { getAuth } from "@/lib/auth/auth";

const createContext = cache(async () => {
	const headers = await H.headers();
	const cookies = await H.cookies();

	const heads = new Headers(headers);
	heads.set("x-trpc-source", "rsc");

	return {
		...createInnerTRPCContext({
			auth: await getAuth(headers),
		}),
		req: {} as NextRequest,
		headers: {
			cookie: cookies.toString(),
			"x-trpc-source": "rsc-invoke",
		},
	};
});

const createCaller = t.createCallerFactory(appRouter);
export const api = createCaller(createContext, {
	onError: ({ error }) => {
		console.log("Error in tRPC server invoker");
		console.error(error);
	},
});
