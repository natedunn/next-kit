"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Link } from "../link";
export const BackHome = () => {
	const pathname = usePathname();
	return (
		<React.Fragment>
			{pathname === "/" ? (
				<span>👋</span>
			) : (
				<Link className="link-as-text" href="/">
					👈 go to index
				</Link>
			)}
		</React.Fragment>
	);
};
