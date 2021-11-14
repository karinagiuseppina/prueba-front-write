import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { PlotCard } from "../component/plotCard";

export const AllPlots = () => {
	const { actions, store } = useContext(Context);
	const [plots, setPlots] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [plotsSelected, setPlotsSelected] = useState([]);

	useEffect(() => {
		getUserPlots();
	}, []);

	useEffect(
		() => {
			let regular_exp = new RegExp(`${searchInput}`);
			let temp = [];
			for (let i = 0; i < plots.length; i++) {
				let name = plots[i].title.toLowerCase();
				if (regular_exp.test(name)) temp.push(plots[i]);
			}
			setPlotsSelected(temp);
		},
		[searchInput]
	);

	const getUserPlots = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/plots`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const plots_array = await resp.json();
			setPlots(plots_array);
			setPlotsSelected(plots_array);
		}
	};
	return (
		<div className="container p-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit short-header">
						My <span>Plots</span>
					</div>
				</div>
			</div>
			<div className="row justify-content-center my-5">
				<div className="col-12 col-md-8">
					<input
						className="search-box"
						placeholder="Search plot"
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</div>
			</div>
			<div className="row justify-content-end">
				<div className="col-12 col-md-4 align-self-end mt-5 mx-auto m-md-0">
					<Link to="/create-plot">
						<button className="btn-prin">Create new plot</button>
					</Link>
				</div>
			</div>
			<div className="row m-auto justify-content-center mt-5">
				<div className="col-12 col-md-8 my-2">
					{plotsSelected.map(plot => (
						<PlotCard plot={plot} key={plot.id} />
					))}
				</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
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
		</div> */
}
