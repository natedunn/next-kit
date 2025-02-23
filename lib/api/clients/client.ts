import type { AppRouter } from '@/lib/api/routers/_app';

import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
