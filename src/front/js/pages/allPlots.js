import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { PlotCard } from "../component/plotCard";

export const AllPlots = () => {
	const { actions, store } = useContext(Context);
	const [plots, setPlots] = useState([]);

	useEffect(() => {
		getUserPlots();
	}, []);

	const getUserPlots = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/plots`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const plots_array = await resp.json();
			setPlots(plots_array);
			console.log(plots_array);
		}
	};
	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">My Plots</h1>
							<div className="d-flex my-3 justify-content-end">
								<button className="btn btn-prin fw-bold text-uppercase w-25 p-2">
									<Link to="/create-plot" className="text-decoration-none text-white">
										Create new Plot
									</Link>
								</button>
							</div>
							{plots.map(plot => (
								<PlotCard plot={plot} key={plot.id} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
