import { useNavigate } from "react-router-dom";
import { Header } from "../Layout/Header";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { SearchItem } from "../HomepageComponents/SearchItem";
import codes from "../../../assets/countryCode.json";
import axios from "axios";
import toast from "react-hot-toast";

export const Cities = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [cities, setCities] = useState([]);
	const apiUrl = import.meta.env.VITE_API_KEY;
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

	const fetchMajorCities = async () => {
		try {
			const data = await axios.get(
				`${apiUrl}/locations/v1/topcities/50?apikey=${apiKey}`
			);
			if (data.status) {
				setCities(data.data);
				setLoading(false);
				return true;
			}
			return false;
		} catch (err: any) {
			setLoading(false);
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
			return false;
		}
	};

	useEffect(() => {
		fetchMajorCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="relative">
			<Header
				setSearchTerm={""}
				searchTerm={void 0}
				searchFn={() => navigate("/weather")}
			/>
			<div>
				<div className="text-sm text-fade mb-5 uppercase my-3">Top Cities</div>
			</div>
			<div className="flex gap-6 lg:flex-row flex-col h-[90%] lg:mb-8 mb-18">
				{loading ? (
					<div className="w-full flex justify-center py-12">
						<ScaleLoader color="white" />
					</div>
				) : (
					<>
						{cities?.length > 0 ? (
							<div className="flex flex-col gap-6 w-full lg:w-3/5">
								{cities?.map((x: any) => (
									<SearchItem
										deg={x?.TimeZone?.Code}
										name={x?.EnglishName}
										sub={x?.Country.EnglishName}
										icon={
											codes?.find((item) => item.code == x.Country.ID)
												?.image as string
										}
										key={x?.Key}
										itemKey={x?.Key}
										isCity
									/>
								))}
							</div>
						) : (
							<div className="w-3/5">
								<div className="font-medium text-[1.5rem] text-white text-center py-12">
									There is no city available at this time
								</div>
							</div>
						)}
					</>
				)}
				<div className="lg:flex flex-col gap-4 w-[32%] hidden h-[75vh] fixed right-10">
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
	);
};
