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
		const { value: character } = await Swal.fire({
			title: "Add new character",
			input: "select",
			inputOptions: characters,
			inputPlaceholder: "Select a character",
			showClass: {
				popup: "animate__animated animate__fadeInDown"
			},
			hideClass: {
				popup: "animate__animated animate__fadeOutUp"
			},
			customClass: {
				container: "container-add-modal",
				popup: "popup-add-modal"
			},
			showCancelButton: true
		});

		if (character) {
			add_character_to_plot({ id: character, name: characters[character] });
		}
	}

	const add_character_to_plot = async character => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/plot/character`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: { id: plot_id, title: plot.title }, character: character })
		});
		if (resp.ok) {
			actions.setToast("success", "Character added to plot!");
			setCharacters([...characters, character]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const delete_character_from_plot = async character_id => {
		const token = actions.getUserToken();
		const resp = await fetch(
			`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/character/${character_id}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json", Authorization: token }
			}
		);
		if (resp.ok) {
			actions.setToast("success", "Character deleted from plot!");
			delete_character(character_id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	const delete_character = character_id => {
		let index = characters.findIndex(c => c.id === character_id);
		let ch = [...characters];
		ch.splice(index, 1);
		setCharacters(ch);
	};

	async function handleAddSociety() {
		const societies = await actions.getUserElements(`user/name/societies`);
		const { value: society } = await Swal.fire({
			title: "Add new Society",
			input: "select",
			inputOptions: societies,
			inputPlaceholder: "Select a society",
			showClass: {
				popup: "animate__animated animate__fadeInDown"
			},
			hideClass: {
				popup: "animate__animated animate__fadeOutUp"
			},
			customClass: {
				container: "container-add-modal",
				popup: "popup-add-modal"
			},
			showCancelButton: true
		});

		if (society) {
			add_society_to_plot({ id: society, name: societies[society] });
		}
	}

	const add_society_to_plot = async society => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/plot/society`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: { id: plot_id, title: plot.title }, society: society })
		});
		if (resp.ok) {
			actions.setToast("success", "Society added to plot!");
			setCharacters([...societies, society]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const delete_society_from_plot = async society_id => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/society/${society_id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			actions.setToast("success", "Society deleted from plot!");
			delete_society(society_id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	const delete_society = society_id => {
		let index = societies.findIndex(c => c.id === society_id);
		let so = [...societies];
		so.splice(index, 1);
		setSocieties(so);
	};
	const deleteEvent = event_id => {
		let index = events.findIndex(e => e.id === event_id);
		let ev = [...events];
		ev.splice(index, 1);
		setEvents(ev);
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
