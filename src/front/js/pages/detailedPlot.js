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
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<div className="d-flex my-3 justify-content-start">
								<Link to="/myplots">Go to all Plots</Link>
							</div>
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">{plot.title}</h1>
							<p>
								genre: {plot.genre}
								<br />
								synopsis: {plot.synopsis}
							</p>

							<AddCharacterRelationshipButton
								setCharacters={setCharacters}
								body={{ plot: { id: plot_id, title: plot.title } }}
								route={"plot/character"}
								characters={characters}
							/>
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
							<AddSocietyRelationshipButton
								setSocieties={setSocieties}
								body={{ plot: { id: plot_id, title: plot.title } }}
								route={"plot/society"}
								societies={societies}
							/>
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
							<div className="d-flex my-3 justify-content-center">
								<button className="btn btn-prin fw-bold text-uppercase w-100 p-2 text-decoration-none text-white">
									<Link to={`/update-plot/${plot_id}`} className="text-decoration-none text-white">
										Update Plot
									</Link>
								</button>

								<button
									onClick={() => actions.confirmDelete(plot.title, deletePlot)}
									className="btn btn-prin text-decoration-none text-white fw-bold text-uppercase w-50 p-2">
									Delete Plot
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
