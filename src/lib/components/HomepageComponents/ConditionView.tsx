export const ConditionView = ({
	icon,
	title,
	value,
}: {
	icon: any;
	title: string;
	value: string;
}) => {
	return (
		<div className="flex gap-4 w-1/2 text-white/80">
			{icon}
			<div className="flex flex-col">
				<div className="text-fade text-sm bg-opacity-80">{title}</div>
				<div className="text-[1.8rem] font-bold">{value}</div>
			</div>
		</div>
	);
};
