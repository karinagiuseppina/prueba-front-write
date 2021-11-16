import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

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

	const confirmDeleteSociety = () => {
		Swal.fire({
			title: `Do you want to delete ${society.name}?`,
			text: "You wont be able to get it back!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete please!"
		}).then(result => {
			if (result.isConfirmed) {
				deleteSociety();
			}
		});
	};

	const deleteSociety = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/societies/delete/${society_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			history.push("/mysocieties");
			actions.setToast("success", "Society deleted!");
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
			add_plot_to_society({ id: plot, title: plots[plot] });
		}
	}

	const add_plot_to_society = async plot => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/plot/society`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: plot, society: { id: society_id, name: society.name } })
		});
		if (resp.ok) {
			actions.setToast("success", "Plot added to society!");
			setPlots([...plots, plot]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	const delete_plot_from_society = async plot_id => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/society/${society_id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			actions.setToast("success", "Plot deleted from society!");
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

							<button onClick={handleAddPlot}> Add plot</button>
							{plots.map(p => {
								return (
									<li key={p.id}>
										{p.title} <button onClick={() => delete_plot_from_society(p.id)}>X</button>
									</li>
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
									onClick={confirmDeleteSociety}
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
