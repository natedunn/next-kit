import type { NextRequest } from 'next/server';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import consola from 'consola';

import { createTRPCContext } from '@/lib/api/context';
import { appRouter } from '@/lib/api/routers/_app';

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () => createTRPCContext({ req }),
		onError: ({ error }) => {
			consola.error('Error in tRPC handler (route.ts):', error);
		},
	});
};

export { handler as GET, handler as POST };
