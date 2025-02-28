import { adminClient, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { getBaseUrl } from '@/lib/utils/get-base-url';

export const authClient = createAuthClient({
	baseURL: getBaseUrl({
		relativePath: false,
	}),
	plugins: [adminClient(), usernameClient()],
});
