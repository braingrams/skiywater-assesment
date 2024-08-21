import { Link } from "react-router-dom";
import { Container } from "../Layout/Container";

export const WelcomeScreen = () => {
	return (
		<Container>
			<div className="flex w-11/12 mx-auto gap-4 h-[100vh] box-border p-14">
				<div className="rounded-[3rem] w-1/2 bg-brand h-full justify-center items-center hidden lg:flex">
					<img className="w-[60%] h-auto" src="/logo.png" alt="logo" />
				</div>
				<div className="h-full flex flex-col justify-center items-center gap-12 w-full lg:w-1/2">
					<img className="h-[4rem] w-auto" src="/logo.png" alt="logo" />
					<div className="flex flex-col gap-2 items-center">
						<h1 className="text-white font-bold text-[2.5rem]">SkiyWater</h1>
						<p className="text-white text-[1.2rem] opacity-90">Weather App</p>
					</div>
					<Link to={"/weather"}>
						<button className="bg-blue-500 text-sm text-white font-medium rounded-full h-12 w-auto px-8 focus:outline-none">
							Get started
						</button>
					</Link>
				</div>
			</div>
		</Container>
	);
};
