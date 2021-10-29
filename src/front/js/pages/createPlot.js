import React, { useState, useContext, useEffect } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { TextareaInput } from "../component/textareaInput";
import { Link } from "react-router-dom";
export const CreatePlot = () => {
	const { actions, store } = useContext(Context);
	const [plot, setPlot] = useState({
		title: "",
		genre: "",
		synopsis: ""
	});

	const handleCreatePlot = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/create-plot`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: plot })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	const updateValue = (attr, value) => {
		let old_plot = { ...plot };
		old_plot[attr] = value;
		setPlot(old_plot);
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
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">Build Plot</h1>
							<NormalInput
								type="text"
								id="title"
								placeholder="Title"
								set={updateValue}
								value={plot.title}
							/>
							<NormalInput
								type="text"
								id="genre"
								placeholder="Genre"
								set={updateValue}
								value={plot.genre}
							/>
							<TextareaInput
								id="synopsis"
								placeholder="Synopsis"
								set={updateValue}
								value={plot.synopsis}
							/>

							<div className="d-flex my-3 justify-content-center">
								<button
									onClick={handleCreatePlot}
									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
									Save plot
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
