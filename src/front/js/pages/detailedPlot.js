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

	useEffect(() => {
		getPlot();
	}, []);

	const getPlot = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/plots/${plot_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const plot = await resp.json();
			setPlot(plot);
		}
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
