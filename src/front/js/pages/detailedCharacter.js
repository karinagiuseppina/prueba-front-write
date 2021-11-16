import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

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
	const confirmDeleteCharacter = () => {
		Swal.fire({
			title: `Do you want to delete ${character.name}?`,
			text: "You wont be able to get it back!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete please!"
		}).then(result => {
			if (result.isConfirmed) {
				deleteCharacter();
			}
		});
	};

	const deleteCharacter = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/custom-characters/delete/${character_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			history.push("/mycharacters");
			actions.setToast("success", "Character deleted!");
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	async function handleAddPlot() {
		const plots = await actions.getUserElements(`user/name/plots`);
		const { value: plot } = await Swal.fire({
			title: "Add new plot",
			input: "select",
			inputOptions: plots,
			inputPlaceholder: "Select a plot",
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

		if (plot) {
			add_plot_to_character({ id: plot, title: plots[plot] });
		}
	}

	const add_plot_to_character = async plot => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/plot/character`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: plot, character: { id: character_id, name: character.name } })
		});
		if (resp.ok) {
			actions.setToast("success", "Plot added to character!");
			setPlots([...plots, plot]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const delete_plot_from_character = async plot_id => {
		const token = actions.getUserToken();
		const resp = await fetch(
			`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/character/${character_id}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json", Authorization: token }
			}
		);
		if (resp.ok) {
			actions.setToast("success", "Plot deleted from character!");
			delete_plot(plot_id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const delete_plot = plot_id => {
		let index = plots.findIndex(c => c.id === plot_id);
		let p = [...plots];
		p.splice(index, 1);
		setPlots(p);
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

							<button onClick={handleAddPlot}> Add plot</button>
							{plots.map(p => {
								return (
									<li key={p.id}>
										{p.title} <button onClick={() => delete_plot_from_character(p.id)}>X</button>
									</li>
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
									onClick={confirmDeleteCharacter}
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
