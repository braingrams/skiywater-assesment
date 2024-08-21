import { useEffect, useState } from "react";
import { SearchItem } from "../HomepageComponents/SearchItem";
import { ScaleLoader } from "react-spinners";
import { Header } from "../Layout/Header";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
	const [favorite, setFavorite] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const isFavorite = localStorage.getItem("favorites");
		setLoading(false);
		if (isFavorite) {
			const parsedFavorite = JSON.parse(isFavorite as unknown as string);
			setFavorite(parsedFavorite);
		}
	}, []);
	const navigate = useNavigate();
	return (
		<div className="relative">
			<Header
				setSearchTerm={""}
				searchTerm={void 0}
				searchFn={() => navigate("/weather")}
			/>
			<div>
				<div className="text-sm text-fade mb-5 uppercase my-3">
					Your Favorites
				</div>
				<div className="flex gap-6 lg:flex-row flex-col">
					{loading ? (
						<div className="w-full flex justify-center py-12">
							<ScaleLoader color="white" />
						</div>
					) : (
						<>
							{favorite?.length > 0 ? (
								<div className="flex flex-col gap-6 w-full lg:w-3/5">
									{favorite?.map((x: any) => (
										<SearchItem
											deg={x?.deg}
											name={x?.name}
											sub={x?.text}
											icon={x?.icon}
											key={x?.key}
											itemKey={x?.key}
										/>
									))}
								</div>
							) : (
								<div className="w-3/5">
									<div className="font-medium text-[1.5rem] text-white text-center py-12">
										You do not have any item on your favorite yet.
									</div>
								</div>
							)}
						</>
					)}
					<div className="lg:flex flex-col gap-4 w-2/5 hidden h-[75vh]">
						<div className="rounded-[1.5rem] p-6 w-full bg-brand h-full flex justify-center items-center">
							<img
								className="w-[60%] h-auto  m-auto"
								src="/logo.png"
								alt="logo"
							/>
							{/* <div className="text-sm text-fade mb-5 uppercase">
						My Location 7-Day Forecast
					</div>
					<div className="flex  flex-col w-full">
						<div className="flex w-full justify-between items-center border-b border-gray-600 last:border-0 h-24">
							<div className="text-fade text-sm">Today</div>
							<div className="flex gap-4 items-center">
								<img className="h-[2rem] w-auto" src="/vite.svg" alt="image" />
								<div className="text-white text-sm font-medium">Sunny</div>
							</div>
							<div className="text-sm ">
								<span className="text-white font-medium">31</span>
								<span className="text-fade ">/22</span>
							</div>
						</div>
					</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
