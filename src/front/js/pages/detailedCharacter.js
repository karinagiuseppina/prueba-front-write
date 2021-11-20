import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { AddPlotRelationshipButton } from "../component/addPlotRelationshipButton";
import { PlotRelatedElement } from "../component/plotRelatedElement";

export const DetailedCharacter = () => {
	const { store, actions } = useContext(Context);
	const [character, setCharacter] = useState({});
	const [plots, setPlots] = useState([]);
	const { character_id } = useParams();
	let history = useHistory();

	useEffect(() => {
		getCharacter();
	}, []);

	const getCharacter = async () => {
		const custom_character = await actions.getUserElements(`user/custom-characters/${character_id}`);
		setCharacter(custom_character);
		let pl = custom_character.plots;
		let array = [];
		for (let plot in pl) {
			array.push({ id: plot, title: pl[plot] });
		}
		setPlots(array);
	};

	const deleteCharacter = async () => {
		const resp = actions.deleteFetch(`custom-characters/delete/${character_id}`);
		if (resp.ok) {
			history.push("/mycharacters");
			actions.setToast("success", "Character deleted!");
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
								<Link to="/mycharacters">Go to all characters</Link>
							</div>
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">
								{character.name}
							</h1>
							<p>
								nickname: {character.nickname} <br />
								age: {character.age}
								<br />
								occupation: {character.occupation}
								<br />
								nationality: {character.nationality}
								<br />
								sexual_orientation: {character.sexual_orientation}
								<br />
							</p>
							<p>personality: {character.personality}</p>
							<p>
								eye_color: {character.eye_color}
								<br />
								hair_color: {character.hair_color}
								<br />
								skin_color: {character.skin_color}
								<br />
								appearence: {character.appearence}
								<br />
							</p>

							<AddPlotRelationshipButton
								setPlots={setPlots}
								body={{ character: { id: character_id, name: character.name } }}
								route={"plot/character"}
								plots={plots}
							/>
							{plots.map(p => {
								return (
									<PlotRelatedElement
										key={p.id}
										delete_route={`character/${character_id}`}
										setPlots={setPlots}
										plots={plots}
										plot={p}
									/>
								);
							})}

							<div className="d-flex my-3 justify-content-center">
								<button className="btn btn-prin fw-bold text-uppercase w-100 p-2">
									<Link
										to={`/update-character/${character_id}`}
										className="text-decoration-none text-white">
										Update Character
									</Link>
								</button>

								<button
									onClick={() => actions.confirmDelete(character.name, deleteCharacter)}
									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
									Delete Character
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
