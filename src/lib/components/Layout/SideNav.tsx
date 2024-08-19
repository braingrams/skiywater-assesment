import { FaCloudSunRain, FaHandHoldingHeart } from "react-icons/fa";
import { MenuItem } from "../HomepageComponents/MenuItem";

export const SideNav = () => {
	const menuItemsList = [
		{ id: 1, name: "Weather", url: "/weather", icon: <FaCloudSunRain /> },
		// { id: 2, name: "Cities", url: "/cities", icon: <FaCity /> },
		{
			id: 3,
			name: "Favorites",
			url: "/favorites",
			icon: <FaHandHoldingHeart />,
		},
	];
	return (
		<div className="fixed h-[93%] w-[7%] rounded-[1.5rem] flex flex-col gap-16 bg-brand py-8">
			<img className="h-auto w-[70%] mx-auto" src="/logo.png" alt="logo" />
			<div className="flex flex-col gap-10">
				{menuItemsList?.map((x) => (
					<MenuItem icon={x.icon} text={x.name} url={x.url} key={x.id} />
				))}
			</div>
		</div>
	);
};
