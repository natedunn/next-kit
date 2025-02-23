import { getBaseUrl } from "@/lib/utils/get-base-url";
import { createAuthClient } from "better-auth/react";
import { adminClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: getBaseUrl({
		relativePath: false,
	}),
	plugins: [usernameClient()],
});
