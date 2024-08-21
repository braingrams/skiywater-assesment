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
import { useSearchParams } from "react-router-dom";

export const WeatherPage = () => {
	const [degreeType, setDegreeType] = useState<string>("Celsius");
	const [searchTerm, setSearchTerm] = useState("");
	const [locationName, setLocationName] = useState("");
	const [showSearchBox, setShowSearchBox] = useState(false);
	const [loading, setLoading] = useState({ id: "weather" });
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchedCities, setSearchedCities] = useState([]);
	const [fetchedData, setFetchedData] = useState<any>(null);
	const [dailyData, setdailyData] = useState<any>(null);
	const [hourData, sethourData] = useState<any>(null);
	const [curKey, setCurKey] = useState<any>();
	const conversions = ["Celsius", "Fahrenheit"];
	const apiUrl = import.meta.env.VITE_API_KEY;
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

	const locationKey = searchParams.get("key");

	function fahrenheitToCelsius(fahrenheit: number) {
		const celsius = ((fahrenheit - 32) * 5) / 9;
		return celsius?.toFixed(2);
	}

	const fetchGeocodedCities = async () => {
		setLoading({ id: "searching" });
		setSearchedCities([]);
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
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
		}
	};

	const fetchSpecificCityData = async (locKey: number) => {
		setCurKey(locKey);
		try {
			const data = await axios.get(
				`${apiUrl}/currentconditions/v1/${locKey}?apikey=${apiKey}`
			);
			console.log({ data });
			if (data.status) {
				setFetchedData(data.data?.at(0));

				return true;
			}
			return false;
		} catch (err: any) {
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
			return false;
		}
	};
	const fetchFiveDaysData = async (locKey: number) => {
		try {
			const data = await axios.get(
				`${apiUrl}/forecasts/v1/daily/5day/${locKey}?apikey=${apiKey}`
			);
			if (data.status) {
				setdailyData(data.data?.DailyForecasts);
				return true;
			}
			return false;
		} catch (err: any) {
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
			return false;
		}
	};
	const fetchFiveHourData = async (locKey: number) => {
		try {
			const data = await axios.get(
				`${apiUrl}/forecasts/v1/hourly/12hour/${locKey}?apikey=${apiKey}`
			);
			if (data.status) {
				sethourData(data.data);
				setLoading({ id: "" });
				return true;
			}
			return false;
		} catch (err: any) {
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
			return false;
		}
	};

	const fetchAllDataOnRequest = async (locKey: number) => {
		setLoading({ id: "weather" });
		try {
			const specificCityDataSuccess = await fetchSpecificCityData(locKey);
			if (specificCityDataSuccess) {
				setLoading({ id: "daily" });
				// If the first request was successful, proceed to fetch five-hour data
				const fiveHourDataSuccess = await fetchFiveHourData(locKey);
				if (fiveHourDataSuccess) {
					setLoading({ id: "hour" });
					// If the second request was successful, proceed to fetch five-days data
					await fetchFiveDaysData(locKey);
					setLoading({ id: "" });
				}
			}
		} catch (err: any) {
			setLoading({ id: "" });
			toast.error(
				err?.message == "Network Error"
					? "Resource Limit exceeded: You have used the 50 daily allocated request, contact site owner if you are not the owner or upgrade if you are the site owner"
					: err?.message || err?.body?.message
			);
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

	useEffect(() => {
		if (locationKey && locationKey !== "undefined") {
			fetchAllDataOnRequest(locationKey as unknown as number);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const modeledTitle = fetchedData?.Link?.split("/")?.at(5);

	return (
		<div className="relative mb-14 lg:mb-0">
			<Header
				setSearchTerm={setSearchTerm}
				searchTerm={searchTerm}
				searchFn={fetchGeocodedCities}
			/>
			{showSearchBox && (
				<div className="absolute top-15 left-0 w-full lg:w-3/5 z-[999]">
					<SearchResults
						results={searchedCities}
						setResults={setShowSearchBox}
						setSearchTerm={setLocationName}
						fetchSpecificCityData={fetchAllDataOnRequest}
						loading={loading}
						setSearchParams={setSearchParams}
					/>
				</div>
			)}
			{!fetchedData ? (
				<div className="font-medium text-[1.1rem] lg:text-[1.5rem] text-white py-12 px-3">
					Search for a city to view weather information
				</div>
			) : (
				<div className="flex gap-6 flex-col lg:flex-row">
					{/* First top */}
					{loading?.id == "weather" ? (
						<div className="w-full flex justify-center py-12">
							<ScaleLoader color="white" />
						</div>
					) : (
						<div className="flex flex-col gap-4 w-full lg:w-3/5">
							{/* <SearchItem deg="31" name="Madrid" sub="10:23" /> */}
							<div className="flex flex-col-reverse lg:flex-row justify-between w-full lg:items-center px-6 lg:px-12 py-8 relative">
								<div
									className="absolute right-0 top-5 cursor-pointer"
									onClick={() =>
										saveAsFavorite({
											key: curKey,
											name: locationName || modeledTitle,
											deg: fetchedData?.Temperature?.Metric?.Value,
											text: fetchedData?.WeatherText,
											icon: fetchedData?.WeatherIcon,
										})
									}
								>
									{isFav ? <FaHeart color="yellow" /> : <FaRegHeart />}
								</div>
								<div>
									<div className="flex lg:flex-col gap-10 justify-between lg:justify-start">
										<div className="flex flex-col">
											<div className="font-bold text-[30px] lg:text-[45px] text-white capitalize">
												{locationName || modeledTitle}
											</div>
											<div className="lg:text-[1rem] text-sm text-white opacity-60">
												{/* Chance of rain:{" "}
											{fetchedData?.Temperature?.Metric?.Value < 15
												? "31"
												: "10"}
											% */}
												{fetchedData?.WeatherText}
											</div>
										</div>
										<div>
											<div className="font-bold lg:text-[4.5rem] text-[2rem] text-white">
												{degreeType == "Celsius"
													? fetchedData?.Temperature?.Metric?.Value
													: fetchedData?.Temperature?.Imperial?.Value}
												&deg;
											</div>
											<div className="hidden lg:flex gap-2 bg-brand px-1 py-1 rounded-full cursor-pointer lg:w-fit w-full">
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
									<div className="lg:hidden flex gap-2 bg-brand px-1 py-1 rounded-full cursor-pointer lg:w-fit w-full mt-3 mx-auto">
										{conversions?.map((x) => (
											<div
												className={`px-4 w-full text-center rounded-full ${
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

								<div className="lg:w-[210px]">
									<WeatherIcon fetchedData={fetchedData?.WeatherIcon} />
								</div>
							</div>
							{/* Second Top  */}
							<div className="rounded-[1.5rem] p-6 w-full bg-brand">
								<div className="text-sm text-fade mb-5 uppercase">
									Today's forecast
								</div>
								<div className="flex flex-nowrap overflow-auto w-full mx-auto pb-2">
									{hourData?.slice(0, 6).map((x: any) => (
										<div className="flex flex-col gap-4 items-center border-r border-gray-600 lg:px-6 px-2 last:border-0 w-fit">
											<div className="text-fade lg:text-sm text-[.6rem] font-medium whitespace-nowrap">
												{dayjs(x?.DateTime).format("hh:mm A")}
											</div>
											<WeatherIcon
												fetchedData={x?.WeatherIcon}
												className="lg:h-[2.5rem] lg:w-auto w-10"
											/>
											<div className="text-white lg:text-[1.4rem] font-bold">
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
										value={
											fetchedData?.HasPrecipitation
												? fetchedData?.Precipitation
												: 0
										}
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
						<div className="flex flex-col gap-4 lg:w-2/5 ">
							<div className="rounded-[1.5rem] p-6 w-full bg-brand h-[80%]">
								<div className="text-sm text-fade mb-5 uppercase">
									5-Day Forecast
								</div>
								<div className="flex  flex-col w-full">
									{dailyData?.map((x: any) => (
										<div className="flex w-full justify-between items-center border-b border-gray-600 last:border-0 h-24">
											<div className="text-fade text-sm lg:w-[30%] w-[20%]">
												{dayjs(x.Date).format("DD/MM/YY") ==
												dayjs().format("DD/MM/YY")
													? "Today"
													: dayjs(x?.Date).format("ddd")}
											</div>
											<div className="flex items-center h-24 w-[100%] justify-between">
												<div className="flex gap-4 items-center">
													<WeatherIcon
														fetchedData={x?.Day?.Icon}
														className="lg:w-[2rem] lg:h-auto w-8"
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
