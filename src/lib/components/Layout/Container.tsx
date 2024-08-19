import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
	return <div className="w-100">{children}</div>;
};
