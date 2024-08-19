import { useEffect, useState } from "react";
import {
	FaHeart,
	FaRegHeart,
	FaShower,
	FaThermometerFull,
	FaWind,
} from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { ConditionView } from "../HomepageComponents/ConditionView";
import { Header } from "../Layout/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { SearchResults } from "../HomepageComponents/SearchResults";
import { ScaleLoader } from "react-spinners";
import dayjs from "dayjs";
import { WeatherIcon } from "../HomepageComponents/WeatherIcon";

export const WeatherPage = () => {
	const [degreeType, setDegreeType] = useState<string>("Celsius");
	const [searchTerm, setSearchTerm] = useState("");
	const [showSearchBox, setShowSearchBox] = useState(false);
	const [loading, setLoading] = useState({ id: "" });
	const [searchedCities, setSearchedCities] = useState([]);
	const [fetchedData, setFetchedData] = useState<any>(null);
	const [dailyData, setdailyData] = useState<any>(null);
	const [hourData, sethourData] = useState<any>(null);
	const [curKey, setCurKey] = useState<any>();
	const conversions = ["Celsius", "Fahrenheit"];
	const apiUrl = import.meta.env.VITE_API_KEY;
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

	function fahrenheitToCelsius(fahrenheit: number) {
		const celsius = ((fahrenheit - 32) * 5) / 9;
		return celsius?.toFixed(2);
	}

	const fetchGeocodedCities = async () => {
		setLoading({ id: "searching" });
		setShowSearchBox(true);
		try {
			const data = await axios.get(
				`${apiUrl}/locations/v1/cities/search?q=${searchTerm}&apikey=${apiKey}`
			);
			if (data.status) {
				setSearchedCities(data.data);
				setLoading({ id: "" });
			}
		} catch (err: any) {
			setLoading({ id: "" });
			toast.error(err?.message || err?.body?.message);
		}
	};

	const fetchSpecificCityData = async (locKey: number) => {
		setLoading({ id: "weather" });
		setCurKey(locKey);
		try {
			const data = await axios.get(
				`${apiUrl}/currentconditions/v1/${locKey}?apikey=${apiKey}`
			);
			if (data.status) {
				setFetchedData(data.data?.at(0));
				setLoading({ id: "" });
			}
		} catch (err: any) {
			toast.error(err?.body?.message || err?.message);
			setLoading({ id: "" });
		}
	};
	const fetchFiveDaysData = async (locKey: number) => {
		setLoading({ id: "daily" });
		try {
			const data = await axios.get(
				`${apiUrl}/forecasts/v1/daily/5day/${locKey}?apikey=${apiKey}`
			);
			if (data.status) {
				setdailyData(data.data?.DailyForecasts);
				setLoading({ id: "" });
			}
		} catch (err: any) {
			toast.error(err?.body?.message || err?.message);
			setLoading({ id: "" });
		}
	};
	const fetchFiveHourData = async (locKey: number) => {
		setLoading({ id: "hour" });
		try {
			const data = await axios.get(
				`${apiUrl}/forecasts/v1/hourly/12hour/${locKey}?apikey=${apiKey}`
			);
			if (data.status) {
				sethourData(data.data);
				setLoading({ id: "" });
			}
		} catch (err: any) {
			toast.error(err?.body?.message || err?.message);
			setLoading({ id: "" });
		}
	};

	const fetchAllDataOnRequest = async (locKey: number) => {
		try {
			await fetchSpecificCityData(locKey);
			await fetchFiveHourData(locKey);
			await fetchFiveDaysData(locKey);
		} catch (err: any) {
			toast.error(err?.body?.message || err?.message);
		}
	};

	const [favorite, setFavorite] = useState<any>([]);
	const [isFav, setIsFav] = useState<any>(
		favorite?.find((x: any) => x.key == curKey)
	);
	const saveAsFavorite = (data: any) => {
		setIsFav(true);
		const exist = favorite?.find((x: any) => x?.key == data?.key);
		if (exist) {
			const newFav = favorite?.filter((x: any) => !x.key);
			localStorage.setItem("favorites", JSON.stringify(newFav));
			return;
		}
		const allFavorite = [
			...favorite,
			{
				key: data?.key,
				name: data.name,
				deg: data.deg,
				text: data.text,
				icon: data.icon,
			},
		];
		localStorage.setItem("favorites", JSON.stringify(allFavorite));
	};

	useEffect(() => {
		const isFavorite = localStorage.getItem("favorites");
		if (isFavorite) {
			const parsedFavorite = JSON.parse(isFavorite as unknown as string);
			setFavorite(parsedFavorite);
		}
	}, []);

	const searchName = searchTerm || "";

	return (
		<div className="relative">
			<Header
				setSearchTerm={setSearchTerm}
				searchTerm={searchTerm}
				searchFn={fetchGeocodedCities}
			/>
			{showSearchBox && (
				<div className="absolute top-15 left-0 w-3/5 z-[999]">
					<SearchResults
						results={searchedCities}
						setResults={setShowSearchBox}
						setSearchTerm={setSearchTerm}
						fetchSpecificCityData={fetchAllDataOnRequest}
						loading={loading}
					/>
				</div>
			)}
			{!fetchedData ? (
				<div className="font-medium text-[1.5rem] text-white py-12 px-3">
					Search for a city to view weather information
				</div>
			) : (
				<div className="flex gap-6">
					{/* First top */}
					{loading?.id == "weather" ? (
						<div className="w-full flex justify-center py-12">
							<ScaleLoader color="white" />
						</div>
					) : (
						<div className="flex flex-col gap-4 w-3/5">
							{/* <SearchItem deg="31" name="Madrid" sub="10:23" /> */}
							<div className="flex justify-between w-full items-center px-12 py-8 relative">
								<div
									className="absolute right-0 top-5 cursor-pointer"
									onClick={() =>
										saveAsFavorite({
											key: curKey,
											name: searchName,
											deg: fetchedData?.Temperature?.Metric?.Value,
											text: fetchedData?.WeatherText,
											icon: fetchedData?.WeatherIcon,
										})
									}
								>
									{isFav ? <FaHeart color="yellow" /> : <FaRegHeart />}
								</div>
								<div className="flex flex-col gap-10 ">
									<div className="flex flex-col">
										<div className="font-bold text-[45px] text-white capitalize">
											{searchName}
										</div>
										<div className="text-[1rem] text-white opacity-60">
											{/* Chance of rain:{" "}
											{fetchedData?.Temperature?.Metric?.Value < 15
												? "31"
												: "10"}
											% */}
											{fetchedData?.WeatherText}
										</div>
									</div>
									<div>
										<div className="font-bold text-[4.5rem] text-white">
											{degreeType == "Celsius"
												? fetchedData?.Temperature?.Metric?.Value
												: fetchedData?.Temperature?.Imperial?.Value}
											&deg;
										</div>
										<div className="flex gap-2 bg-brand px-1 py-1 rounded-full cursor-pointer w-fit">
											{conversions?.map((x) => (
												<div
													className={`px-4 rounded-full ${
														degreeType == x ? "bg-blue-500" : "bg-transparent"
													}`}
													key={x}
													onClick={() => setDegreeType(x)}
												>
													{x}
												</div>
											))}
										</div>
									</div>
								</div>

								<div className="w-[210px]">
									<WeatherIcon fetchedData={fetchedData?.WeatherIcon} />
								</div>
							</div>
							{/* Second Top  */}
							<div className="rounded-[1.5rem] p-6 w-full bg-brand">
								<div className="text-sm text-fade mb-5 uppercase">
									Today's forecast
								</div>
								<div className="flex flex-nowrap overflow-auto w-full mx-auto">
									{hourData?.slice(0, 6).map((x: any) => (
										<div className="flex flex-col gap-4 items-center border-r border-gray-600 px-6 last:border-0">
											<div className="text-fade text-sm font-medium">
												{dayjs(x?.DateTime).format("hh:mm A")}
											</div>
											<WeatherIcon
												fetchedData={x?.WeatherIcon}
												className="h-[2.5rem] w-auto"
											/>
											<div className="text-white text-[1.4rem] font-bold">
												{degreeType == "Fahrenheit"
													? x?.Temperature?.Value
													: fahrenheitToCelsius(x?.Temperature?.Value)}
												&deg;
											</div>
										</div>
									))}
								</div>
							</div>
							{/* Third Top  */}
							<div className="rounded-[1.5rem] p-6 w-full bg-brand">
								<div className="text-sm text-fade mb-5 uppercase">
									Air condition
								</div>
								<div className="flex flex-wrap w-full mx-auto gap-y-6">
									<ConditionView
										icon={<FaThermometerFull />}
										title="Precipitation"
										value={fetchedData?.HasPrecipitation}
									/>
									<ConditionView
										icon={<FaWind />}
										title="Wind speed"
										value={`${fetchedData?.Wind?.Speed || 0}°`}
									/>
									<ConditionView
										icon={<FaShower />}
										title="Humidity"
										value={`${fetchedData?.WeatherIcon || 0}°`}
									/>
									<ConditionView
										icon={<TbUvIndex />}
										title="UV Index"
										value={`${fetchedData?.UVIndexText || 0}°`}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Side view  */}
					{loading?.id !== "searching" && loading?.id !== "" ? (
						<div className="w-full flex justify-center py-12">
							<ScaleLoader color="white" />
						</div>
					) : (
						<div className="flex flex-col gap-4 w-2/5 ">
							<div className="rounded-[1.5rem] p-6 w-full bg-brand h-[80%]">
								<div className="text-sm text-fade mb-5 uppercase">
									5-Day Forecast
								</div>
								<div className="flex  flex-col w-full">
									{dailyData?.map((x: any) => (
										<div className="flex w-full justify-between items-center border-b border-gray-600 last:border-0 h-24">
											<div className="text-fade text-sm w-[30%]">
												{dayjs(x.Date).format("DD/MM/YY") ==
												dayjs().format("DD/MM/YY")
													? "Today"
													: dayjs(x?.Date).format("ddd")}
											</div>
											<div className="flex items-center h-24 w-[100%] justify-between">
												<div className="flex gap-4 items-center">
													<WeatherIcon
														fetchedData={x?.Day?.Icon}
														className="h-[2rem] w-auto"
													/>
													<div className="text-white text-sm font-medium">
														{x?.Day?.IconPhrase}
													</div>
												</div>
												<div className="text-sm ">
													<span className="text-white font-medium">
														{degreeType == "Celsius"
															? fahrenheitToCelsius(
																	x?.Temperature?.Maximum?.Value
															  )
															: x?.Temperature?.Maximum?.Value}
													</span>
													<span className="text-fade ">
														/
														{degreeType == "Celsius"
															? fahrenheitToCelsius(
																	x?.Temperature?.Minimum?.Value
															  )
															: x?.Temperature?.Minimum?.Value}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
