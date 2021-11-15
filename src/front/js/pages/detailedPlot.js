import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import Swal from "sweetalert2";

export const DetailedPlot = () => {
	const { store, actions } = useContext(Context);
	const [plot, setPlot] = useState({});
	const { plot_id } = useParams();
	let history = useHistory();
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		getPlot();
	}, []);

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
		console.log(characters);
		let index = characters.findIndex(c => c.id === character_id);
		let characters = [...characters];
		characters.splice(index, 1);
		setCharacters(characters);
		// const token = actions.getUserToken();
		// const resp = await fetch(
		// 	`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/character/${character_id}`,
		// 	{
		// 		method: "DELETE",
		// 		headers: { "Content-Type": "application/json", Authorization: token }
		// 	}
		// );
		// if (resp.ok) {
		// 	actions.setToast("success", "Character deleted from plot!");

		// } else {
		// 	actions.setToast("error", "There has been a problem!");
		// }
	};

	const getPlot = async () => {
		const plot = await actions.getUserElements(`user/plots/${plot_id}`);
		setPlot(plot);
		let characters_obj = plot.characters;
		let array = [];
		for (let character in characters_obj) {
			array.push({ id: character, name: characters_obj[character] });
		}
		setCharacters(array);
	};
	useEffect(
		() => {
			console.log(characters);
		},
		[characters]
	);
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
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/plots/${plot_id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
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

							<button onClick={handleAddCharacter}> Add character</button>
							{characters.map((c, index) => {
								return (
									<li key={c.id}>
										{c.name} <button onClick={() => delete_character_from_plot(c.id)}>X</button>
									</li>
								);
							})}
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
