import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

import { createTRPCContext } from '@/lib/api/context';
import { appRouter } from '@/lib/api/routers/_app';

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () => createTRPCContext({ req }),
		onError: ({ error }) => {
			console.log('Error in tRPC handler (route.ts)');
			console.error(error);
		},
	});
};

export { handler as GET, handler as POST };
