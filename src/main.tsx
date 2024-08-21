import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HomePage } from "./lib/components/Pages/HomePage";
import ErrorPage from "./lib/error-page";
import { MainLayout } from "./lib/components/Layout/MainLayout";
import { WeatherPage } from "./lib/components/Pages/WeatherPage";
import { Favorites } from "./lib/components/Pages/Favorites";
import { Toaster } from "react-hot-toast";
import { Cities } from "./lib/components/Pages/Cities";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/weather",
				element: <WeatherPage />,
			},
			{
				path: "/cities",
				element: <Cities />,
			},
			{
				path: "/favorites",
				element: <Favorites />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<Toaster position="top-right" />
	</React.StrictMode>
);
