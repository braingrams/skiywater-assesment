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
		<div className="w-full h-16">
			<div className="w-3/5 relative h-12">
				<input
					className="rounded-lg bg-brand px-4 text-white h-full w-full text-sm focus:outline-none"
					placeholder="Search for cities"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
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
