import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
// import { Header } from "./Header";
import { useLocation } from "react-router-dom";

export const MainLayout = () => {
	const location = useLocation();
	const isHome = location.pathname === "/";
	return (
		<div>
			{isHome ? (
				<main>
					<Outlet />
				</main>
			) : (
				<div className="flex p-8 w-full">
					<SideNav />
					<div className="lg:w-[91%] w-full ml-auto">
						<main>
							<Outlet />
						</main>
					</div>
				</div>
			)}
		</div>
	);
};
