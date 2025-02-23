"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { getBaseUrl } from "@/lib/utils/get-base-url";
import React from "react";

export const GithubButton = ({ disabled = false }: { disabled?: boolean }) => {
	const [loading, setLoading] = React.useState(false);
	const { signIn } = authClient;

	return (
		<Button
			onClick={async () => {
				setLoading(true);
				await signIn.social({
					provider: "github",
					callbackURL: `${getBaseUrl({
						relativePath: false,
					})}`,
				});
			}}
			disabled={disabled}
		>
			{disabled
				? "You are already signed in"
				: loading
				? "Signing in..."
				: "Sign in with Github"}
		</Button>
	);
};
