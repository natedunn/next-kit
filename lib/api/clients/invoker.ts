import { cache } from 'react';
import consola from 'consola';
import * as H from 'next/headers';
import { NextRequest } from 'next/server';

import { createInnerTRPCContext } from '@/lib/api/context';
// import { validateAuthRequest } from "@/lib/auth/utils";
import { t } from '@/lib/api/init';
import { appRouter } from '@/lib/api/routers/_app';
import { getAuth } from '@/lib/auth/auth';
import { getBaseUrl } from '@/lib/utils/get-base-url';

const createContext = cache(async () => {
	const headers = await H.headers();
	const cookies = await H.cookies();

	const baseUrl = getBaseUrl();
	const req = new NextRequest(`${baseUrl}`, { headers }) as NextRequest;

	return {
		...createInnerTRPCContext({
			auth: await getAuth(),
		}),
		req,
		headers: {
			cookie: cookies.toString(),
			'x-trpc-source': 'rsc-invoke',
		},
	};
});

const createCaller = t.createCallerFactory(appRouter);
export const api = createCaller(createContext, {
	onError: ({ error }) => {
		consola.error('Error in tRPC server invoker', error);
	},
});
