import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import Swal from "sweetalert2";
import { AddEventButton } from "../component/addEventButton";
import { EventListElement } from "../component/eventListElement";

export const DetailedPlot = () => {
	const { store, actions } = useContext(Context);
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

	const confirmDeletePlot = () => {
		Swal.fire({
			title: `Do you want to delete the plot ${plot.title}?`,
			text: "You wont be able to get it back!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete please!"
		}).then(result => {
			if (result.isConfirmed) {
				deletePlot();
			}
		});
	};

	const deletePlot = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/plots/delete/${plot_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			history.push("/myplots");
			actions.setToast("success", "Plot deleted!");
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	async function handleAddCharacter() {
		const characters = await actions.getUserElements(`user/name/custom-characters`);
		let character = await actions.setModalSelection("character", characters);
		if (character) {
			add_character_to_plot({ id: character, name: characters[character] });
		}
	}
	async function handleAddSociety() {
		const societies = await actions.getUserElements(`user/name/societies`);
		let society = await actions.setModalSelection("society", societies);
		if (society) {
			add_society_to_plot({ id: society, name: societies[society] });
		}
	}
	const add_character_to_plot = async character => {
		let body = { plot: { id: plot_id, title: plot.title }, character: character };
		const resp = await actions.addRelationshipBetweenElements("plot/character", body);
		if (resp.ok) {
			actions.setToast("success", "Character added to plot!");
			setCharacters([...characters, character]);
		} else {
			actions.setToast("error", "Try!");
		}
	};

	const delete_character_from_plot = async character_id => {
		const resp = await actions.deleteFetch(`delete/plot/${plot_id}/character/${character_id}`);
		if (resp.ok) {
			actions.setToast("success", "Character deleted from plot!");
			delete_character(character_id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const add_society_to_plot = async society => {
		let body = { plot: { id: plot_id, title: plot.title }, society: society };
		const resp = await actions.addRelationshipBetweenElements("plot/society", body);
		if (resp.ok) {
			actions.setToast("success", "Society added to plot!");
			setSocieties([...societies, society]);
		} else {
			actions.setToast("error", "Try again!");
		}
	};

	const delete_society_from_plot = async society_id => {
		const resp = await actions.deleteFetch(`delete/plot/${plot_id}/society/${society_id}`);
		if (resp.ok) {
			actions.setToast("success", "Society deleted from plot!");
			delete_society(society_id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	const delete_character = character_id => {
		actions.deleteElementFromStateList(setCharacters, characters, character_id);
	};
	const delete_society = society_id => {
		actions.deleteElementFromStateList(setSocieties, societies, society_id);
	};
	const deleteEvent = event_id => {
		actions.deleteElementFromStateList(setEvents, events, event_id);
	};

	const add_event_to_plot = event => {
		setEvents([...events, event]);
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

							<button onClick={handleAddCharacter}> Add character</button>
							<ul>
								{characters.map(c => {
									return (
										<li key={c.id}>
											{c.name} <button onClick={() => delete_character_from_plot(c.id)}>X</button>
										</li>
									);
								})}
							</ul>
							<button onClick={handleAddSociety}> Add Society</button>
							<ul>
								{societies.map(s => {
									return (
										<li key={s.id}>
											{s.name} <button onClick={() => delete_society_from_plot(s.id)}>X</button>
										</li>
									);
								})}
							</ul>

							<AddEventButton plot_id={plot_id} addEvent={add_event_to_plot} />
							<ul className="timeline">
								{events.map(e => {
									return (
										<EventListElement
											event={e}
											key={e.id}
											deleteEvent={deleteEvent}
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
									onClick={confirmDeletePlot}
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
