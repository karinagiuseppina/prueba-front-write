import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import Swal from "sweetalert2";
import { AddEventButton } from "../component/addEventButton";
import { EventListElement } from "../component/eventListElement";
import { AddCharacterRelationshipButton } from "../component/addCharacterRelationshipButton";
import { AddSocietyRelationshipButton } from "../component/addSocietyRelationshipButton";
import { CharacterRelatedElement } from "../component/characterRelatedElement";
import { SocietyRelatedElement } from "../component/societyRelatedElement";

export const DetailedPlot = () => {
	const { actions } = useContext(Context);
	const [plot, setPlot] = useState({});
	const { plot_id } = useParams();
	let history = useHistory();
	const [characters, setCharacters] = useState([]);
	const [societies, setSocieties] = useState([]);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		getPlot();
	}, []);

	const getPlot = async () => {
		getEvents();
		const plot = await actions.getUserElements(`user/plots/${plot_id}`);
		setPlot(plot);
		elementsToArray(plot.characters, setCharacters);
		elementsToArray(plot.societies, setSocieties);
	};
	const getEvents = async () => {
		const events = await actions.getUserElements(`user/plots/${plot_id}/events`);
		setEvents(events);
	};
	const elementsToArray = (elements_obj, set) => {
		let array = [];
		for (let element in elements_obj) {
			array.push({ id: element, name: elements_obj[element] });
		}
		set(array);
	};

	const deletePlot = async () => {
		const resp = actions.deleteFetch(`plots/delete/${plot_id}`);
		if (resp.ok) {
			history.push("/myplots");
			actions.setToast("success", "Plot deleted!");
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit detailed-header">{plot.title}</div>
				</div>
				<div className="col-12 col-md-2 align-self-end">
					<div className="deatailed-info-buttons">
						<button className="btn-prin">
							<Link to={`/update-plot/${plot_id}`} className="text-decoration-none text-white">
								Update Plot
							</Link>
						</button>

						<button onClick={() => actions.confirmDelete(plot.title, deletePlot)} className="btn-prin mt-2">
							Delete Plot
						</button>
					</div>
				</div>
			</div>
			<div className="row justify-content-center mt-5">
				<div className="col-12 col-md-8">
					<div className="info-container">
						<h3>Genre: {plot.genre} </h3>
						<hr />
						<h3>Synopsis </h3>
						<p>{plot.synopsis}</p>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-4">
					<div className="relationship-container">
						<div className="relationship-container-header">
							<h3>Characters </h3>
							<AddCharacterRelationshipButton
								setCharacters={setCharacters}
								body={{ plot: { id: plot_id, title: plot.title } }}
								route={"plot/character"}
								characters={characters}
							/>
						</div>

						<ul>
							{characters.map(c => {
								return (
									<CharacterRelatedElement
										key={c.id}
										delete_route={`plot/${plot_id}`}
										setCharacters={setCharacters}
										characters={characters}
										character={c}
									/>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="col-12 col-md-4">
					<div className="relationship-container">
						<div className="relationship-container-header">
							<h3>Societies</h3>
							<AddSocietyRelationshipButton
								setSocieties={setSocieties}
								body={{ plot: { id: plot_id, title: plot.title } }}
								route={"plot/society"}
								societies={societies}
							/>
						</div>
						<ul>
							{societies.map(s => {
								return (
									<SocietyRelatedElement
										key={s.id}
										delete_route={`plot/${plot_id}`}
										setSocieties={setSocieties}
										societies={societies}
										society={s}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<div className="events-container">
						<AddEventButton plot_id={plot_id} setEvents={setEvents} events={events} />
						<ul className="timeline">
							{events.map(e => {
								return (
									<EventListElement
										event={e}
										key={e.id}
										setEvents={setEvents}
										events={events}
										plot_id={plot_id}
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
