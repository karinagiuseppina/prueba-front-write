import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { AddPlotRelationshipButton } from "../component/addPlotRelationshipButton";
import { PlotRelatedElement } from "../component/plotRelatedElement";

export const DetailedCharacter = () => {
	const { actions } = useContext(Context);
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
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit detailed-header">{character.name}</div>
				</div>
				<div className="col-12 col-md-2 align-self-end">
					<div className="deatailed-info-buttons">
						<button className="btn-prin">
							<Link to={`/update-character/${character_id}`} className="text-decoration-none text-white">
								Update
							</Link>
						</button>

						<button
							onClick={() => actions.confirmDelete(character.name, deleteCharacter)}
							className="btn-prin mt-2">
							Delete
						</button>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<div className="tag-container">
						<div className="info-tag">
							<span>nickname</span> {character.nickname}
						</div>
						<div className="info-tag">
							<span>age </span>
							{character.age}
						</div>
						<div className="info-tag">
							<span>occupation</span> {character.occupation}
						</div>
						<div className="info-tag">
							<span>nationality</span> {character.nationality}
						</div>
						<div className="info-tag">
							<span>sexual orientation</span> {character.sexual_orientation}
						</div>
						<div className="info-tag">
							<span>eye color</span> {character.eye_color}
						</div>
						<div className="info-tag">
							<span>hair color</span> {character.hair_color}
						</div>
						<div className="info-tag">
							<span>skin color</span> {character.skin_color}
						</div>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-4">
					<div className="info-container">
						<h3>Personality </h3>
						<p>{character.personality}</p>
					</div>
				</div>
				<div className="col-12 col-md-4">
					<div className="info-container">
						<h3>Appearence </h3>
						<p>{character.appearence}</p>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<div className="relationship-container">
						<div className="relationship-container-header">
							<h3>Plots</h3>
							<AddPlotRelationshipButton
								setPlots={setPlots}
								body={{ character: { id: character_id, name: character.name } }}
								route={"plot/character"}
								plots={plots}
							/>
						</div>
						<ul>
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
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
