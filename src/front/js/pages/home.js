import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/styles.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-center mt-5">
			<p>
				<img src={rigoImageUrl} />
			</p>
			<h1>Write Me In</h1>
			<p>One plot, infinite Stories</p>
		</div>
	);
};
