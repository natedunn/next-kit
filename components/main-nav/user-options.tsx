"use client";

import React from "react";

import { createAuthClient } from "better-auth/react";
import { Link } from "../link";
import { useRouter } from "next/navigation";
const { signOut } = createAuthClient();

export const UserOptions = ({ email }: { email?: string }) => {
	const router = useRouter();

	return (
		<React.Fragment>
			{email ? (
				<button
					className="link-as-text"
					onClick={async () => {
						await signOut();
						router.refresh();
					}}
				>
					Sign out ({email})
				</button>
			) : (
				<Link className="link-as-text" href="/sign-in">
					Sign in
				</Link>
			)}
		</React.Fragment>
	);
};
