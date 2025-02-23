import { BackHome } from "./back-home";
import { getAuth } from "@/lib/auth/auth";
import { UserOptions } from "./user-options";

export const MainNav = async () => {
	const { user } = await getAuth();

	return (
		<div className="border-b py-3 flex items-center justify-between">
			<div>
				<BackHome />
			</div>
			<div>
				<UserOptions email={user?.email} />
			</div>
		</div>
	);
};
