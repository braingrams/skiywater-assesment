import { useNavigate, useRouteError } from "react-router-dom";

interface errorModel {
	statusText: string;
	message: string;
}

export default function ErrorPage() {
	const error = useRouteError() as errorModel;
	console.error(error);
	const navigate = useNavigate();

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error?.statusText || error?.message}</i>
			</p>
			<button className="rounded-btn" onClick={() => navigate(-1)}>
				Let's go back
			</button>
		</div>
	);
}
