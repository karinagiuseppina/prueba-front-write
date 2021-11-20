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
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<div className="d-flex my-3 justify-content-start">
								<Link to="/mysocieties">Go to all societies</Link>
							</div>
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">
								{society.name}
							</h1>
							<p>
								{society.basic_needs}
								<br />
								{society.comfort}
								<br />
								{society.culture}
								<br />
								{society.demonym}
								<br />
								{society.entertainment}
								<br />
								{society.ethnic_groups}
								<br />
								{society.government}
								<br />
								{society.language}
								<br />
								{society.population}
								<br />
								{society.reproduction_needs}
								<br />
								{society.social_needs}
							</p>

							<AddPlotRelationshipButton
								setPlots={setPlots}
								body={{ society: { id: society_id, name: society.name } }}
								route={"plot/society"}
								plots={plots}
							/>

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

							<div className="d-flex my-3 justify-content-center">
								<button className="btn btn-prin fw-bold text-uppercase w-100 p-2">
									<Link
										to={`/update-society/${society_id}`}
										className="text-decoration-none text-white">
										Update Society
									</Link>
								</button>

								<button
									onClick={() => actions.confirmDelete(society.name, deleteSociety)}
									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
									Delete Society
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
