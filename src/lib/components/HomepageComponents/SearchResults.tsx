import { MdOutlineClose } from "react-icons/md";
import { ScaleLoader } from "react-spinners";

export const SearchResults = ({
	results,
	setResults,
	fetchSpecificCityData,
	setSearchTerm,
	loading,
}: {
	results: any[];
	setResults: any;
	fetchSpecificCityData: any;
	setSearchTerm: any;
	loading: any;
}) => {
	const onClose = () => {
		setResults(null);
	};
	return (
		<div className="w-full">
			<div className="rounded-[1.5rem] p-6 w-full bg-brand">
				<div className="flex justify-between">
					<div className="text-sm text-fade mb-5 uppercase">Search Results</div>
					<MdOutlineClose onClick={onClose} className="cursor-pointer" />
				</div>
				{loading.id == "searching" ? (
					<ScaleLoader color="white" />
				) : (
					<>
						{results?.length > 0 ? (
							<div className="flex flex-col gap-6 h-[60vh] overflow-auto">
								{results?.map((x) => (
									<div
										className="rounded-[1.3rem] p-6 w-full flex justify-between items-center cursor-pointer hover:bg-transparent hover:border hover:border-blue-500"
										onClick={() => {
											fetchSpecificCityData(x?.Key);
											setSearchTerm(x?.EnglishName);
											onClose();
										}}
										key={x?.Key}
									>
										<div className="flex gap-8 items-center">
											<div className="flex flex-col">
												<div className="font-medium text-[1.5rem] text-white">
													{x?.EnglishName}
												</div>
												<div className="text-[.7rem] text-white opacity-60">
													{x?.Region?.EnglishName}
												</div>
											</div>
										</div>
										<div className="text-[1.5rem] text-white opacity-80">
											{x?.Country?.EnglishName}
										</div>
									</div>
								))}
							</div>
						) : (
							<div>
								<div className="font-medium text-[1.5rem] text-white text-center py-12">
									No result Found for your search keyword
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};
