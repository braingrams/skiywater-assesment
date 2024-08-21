export const Header = ({
	setSearchTerm,
	searchTerm,
	searchFn,
}: {
	setSearchTerm: any;
	searchTerm: any;
	searchFn: any;
}) => {
	return (
		<div className="w-full h-28 sticky top-0 bg-[#0B131E] flex items-center z-[999]">
			<div className="lg:w-3/5 w-full relative h-12">
				<input
					className="rounded-lg bg-brand px-4 text-white h-full w-full text-sm focus:outline-none"
					placeholder="Search for cities"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && searchTerm) {
							searchFn();
						}
					}}
				/>
				<button
					className="absolute top-2 right-3 rounded-full bg-blue-500 text-sm h-[70%] px-8 flex items-center cursor-pointer hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-600"
					onClick={searchFn}
					disabled={!searchTerm}
				>
					Search
				</button>
			</div>
		</div>
	);
};
