import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { AddPlotRelationshipButton } from "../component/addPlotRelationshipButton";
import { PlotRelatedElement } from "../component/plotRelatedElement";

export const DetailedSociety = () => {
	const { store, actions } = useContext(Context);
	const [society, setSociety] = useState({});
	const [plots, setPlots] = useState([]);
	const { society_id } = useParams();
	let history = useHistory();

	useEffect(() => {
		getSociety();
	}, []);

	const getSociety = async () => {
		const society = await actions.getUserElements(`user/societies/${society_id}`);
		setSociety(society);
		let pl = society.plots;
		let array = [];
		for (let plot in pl) {
			array.push({ id: plot, title: pl[plot] });
		}
		setPlots(array);
	};

	const deleteSociety = async () => {
		const resp = actions.deleteFetch(`societies/delete/${society_id}`);
		if (resp.ok) {
			history.push("/mysocieties");
			actions.setToast("success", "Society deleted!");
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-9">
					<div className="header-tit detailed-header">{society.name}</div>
				</div>
				<div className="col-12 col-md-3 align-self-end">
					<div className="deatailed-info-buttons">
						<button className="btn-prin">
							<Link to={`/update-society/${society_id}`} className="text-decoration-none text-white">
								Update
							</Link>
						</button>

						<button
							onClick={() => actions.confirmDelete(society.name, deleteSociety)}
							className="btn-prin mt-2">
							Delete
						</button>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<div className="tag-container-soc">
						<div className="info-tag-soc">
							<span>demonym</span> {society.demonym}
						</div>
						<div className="info-tag-soc">
							<span>Ethnic group</span> {society.ethnic_groups}
						</div>
						<div className="info-tag-soc">
							<span>government</span> {society.government}
						</div>
						<div className="info-tag-soc">
							<span>language</span> {society.language}
						</div>
						<div className="info-tag-soc">
							<span>population</span> {society.population}
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6">
					<div className="relationship-container">
						<div className="relationship-container-header">
							<h3>Plots</h3>
							<AddPlotRelationshipButton
								setPlots={setPlots}
								body={{ society: { id: society_id, name: society.name } }}
								route={"plot/society"}
								plots={plots}
							/>
						</div>
						<ul>
							{plots.map(p => {
								return (
									<PlotRelatedElement
										key={p.id}
										delete_route={`society/${society_id}`}
										setPlots={setPlots}
										plots={plots}
										plot={p}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3>Basic Needs </h3>
						<p>{society.basic_needs}</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3>Comfort </h3>
						<p>{society.comfort}</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3>Culture </h3>
						<p>{society.culture}</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3> Entertainment</h3>
						<p>{society.entertainment}</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3>Reproduction needs </h3>
						<p>{society.reproduction_needs}</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="info-container">
						<h3>Social needs </h3>
						<p>{society.social_needs}</p>
					</div>
				</div>
			</div>
			<div className="row justify-content-center" />
		</div>
	);
};

// <div className="container-fluid m-0 bg-gradiente">
// 			<div className="row align-items-center">
// 				<div className="col-lg-10 col-xl-9 mx-auto">
// 					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
// 						<div className="card-body p-4 p-sm-5">
// 							<div className="d-flex my-3 justify-content-start">
// 								<Link to="/mysocieties">Go to all societies</Link>
// 							</div>
// 							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">
// 								{society.name}
// 							</h1>
// 							<p>
// 								{society.basic_needs}
// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 								<br />

// 							</p>

// 							<AddPlotRelationshipButton
// 								setPlots={setPlots}
// 								body={{ society: { id: society_id, name: society.name } }}
// 								route={"plot/society"}
// 								plots={plots}
// 							/>

// 							{plots.map(p => {
// 								return (
// 									<PlotRelatedElement
// 										key={p.id}
// 										delete_route={`society/${society_id}`}
// 										setPlots={setPlots}
// 										plots={plots}
// 										plot={p}
// 									/>
// 								);
// 							})}

// 							<div className="d-flex my-3 justify-content-center">
// 								<button className="btn btn-prin fw-bold text-uppercase w-100 p-2">
// 									<Link
// 										to={`/update-society/${society_id}`}
// 										className="text-decoration-none text-white">
// 										Update Society
// 									</Link>
// 								</button>

// 								<button
// 									onClick={() => actions.confirmDelete(society.name, deleteSociety)}
// 									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
// 									Delete Society
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
