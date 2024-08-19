export const WeatherIcon = ({
	fetchedData,
	className = "h-auto w-full",
}: {
	fetchedData: any;
	className?: any;
}) => {
	return (
		<img
			className={`${className}`}
			src={
				fetchedData == 4 || fetchedData == 14
					? "/assets/mixcloud.png"
					: fetchedData == 12 || fetchedData == 18 || fetchedData == 15
					? "/assets/rainy.png"
					: fetchedData == 35 || fetchedData == 6 || fetchedData == 7
					? "/assets/cloudy.png"
					: "/assets/sunshine.png"
			}
			alt="logo"
		/>
	);
};
