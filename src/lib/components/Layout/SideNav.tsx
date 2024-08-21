import { FaCity, FaCloudSunRain, FaHandHoldingHeart } from "react-icons/fa";
import { MenuItem } from "../HomepageComponents/MenuItem";

export const SideNav = () => {
	const menuItemsList = [
		{ id: 0, name: "Weather", url: "/weather", icon: <FaCloudSunRain /> },
		{ id: 1, name: "Cities", url: "/cities", icon: <FaCity /> },
		{
			id: 2,
			name: "Favorites",
			url: "/favorites",
			icon: <FaHandHoldingHeart />,
		},
	];
	return (
		<div className="lg:my-8 fixed h-20 lg:h-[92%] w-[100%] lg:w-[7%] lg:rounded-[1.5rem] flex lg:flex-col gap-16 bg-[#0B131E] lg:bg-brand lg:py-8 bottom-0 lg:bottom-auto items-center justify-center lg:justify-start z-[999] left-0 lg:left-[unset]">
			<img
				className="h-auto w-[70%] mx-auto lg:block hidden"
				src="/logo.png"
				alt="logo"
			/>
			<div className="flex lg:flex-col lg:gap-10 gap-5 h-14 lg:h-auto rounded-[1.5rem] lg:rounded-none items-center lg:bg-none bg-brand w-[80%] lg:w-auto justify-center">
				{menuItemsList?.map((x) => (
					<MenuItem
						icon={x.icon}
						text={x.name}
						url={x.url}
						key={x.id}
						index={x.id}
					/>
				))}
			</div>
		</div>
	);
};
