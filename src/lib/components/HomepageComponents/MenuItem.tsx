import { Link, useLocation } from "react-router-dom";

export const MenuItem = ({
	icon,
	text,
	url,
	index,
}: {
	icon: any;
	text: string;
	url: string;
	index: any;
}) => {
	const location = useLocation();
	const isActive = location?.pathname == url;
	return (
		<Link
			to={url}
			style={{
				order: isActive && index !== 2 ? 2 : isActive && index == 2 ? 0 : index,
			}}
		>
			<div className="flex lg:flex-col items-center lg:gap-4 gap-2 text-sm lg:text-[1rem]">
				<div
					className={`${
						isActive ? "text-white font-semibold" : "text-gray-400"
					}`}
				>
					{icon}
				</div>
				<span
					className={`${
						isActive ? "text-white font-semibold" : "text-gray-400"
					} text-smp`}
				>
					{text}
				</span>
			</div>
		</Link>
	);
};
