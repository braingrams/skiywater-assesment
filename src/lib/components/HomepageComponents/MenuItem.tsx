import { Link, useLocation } from "react-router-dom";

export const MenuItem = ({
	icon,
	text,
	url,
}: {
	icon: any;
	text: string;
	url: string;
}) => {
	const location = useLocation();
	const isActive = location?.pathname == url;
	return (
		<Link to={url}>
			<div className="flex flex-col items-center gap-4">
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
