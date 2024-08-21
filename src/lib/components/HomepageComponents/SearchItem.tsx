import { useNavigate } from "react-router-dom";
import { WeatherIcon } from "./WeatherIcon";

export const SearchItem = ({
	name,
	sub,
	deg,
	icon,
	itemKey,
	isCity,
}: {
	name: string;
	sub: string;
	deg: string;
	icon: number | string;
	itemKey: number;
	isCity?: boolean;
}) => {
	const navigate = useNavigate();
	return (
		<div
			className="rounded-[1.3rem] p-4 lg:p-6 w-full bg-brand flex justify-between items-center cursor-pointer hover:bg-transparent hover:border hover:border-blue-500"
			onClick={() => navigate(`/weather?key=${itemKey}`)}
		>
			<div className="flex lg:gap-8 gap-4 items-center">
				{isCity ? (
					<img
						className="lg-h-[3rem] w-[3rem] lg-w-auto"
						src={icon as unknown as string}
						alt={`${name} icon`}
					/>
				) : (
					<WeatherIcon
						fetchedData={icon}
						className="lg-h-[3rem] w-[3rem] lg-w-auto"
					/>
				)}
				<div className="flex flex-col">
					<div className="font-medium lg:text-[2rem] text-white capitalize">
						{name}
					</div>
					<div className="text-[.8rem] text-white opacity-60">{sub}</div>
				</div>
			</div>
			<div className="lg:text-[2rem] text-white opacity-80">
				{isCity ? deg : `${deg}°`}
			</div>
		</div>
	);
};
