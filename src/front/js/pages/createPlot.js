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
		<div className="container p-2 p-md-5">
			<div className="row">
				<div className="col">
					<Link to="/myplots">Go to all Plots</Link>
				</div>
			</div>
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit short-header">
						Build <span>Plot</span>
					</div>
				</div>
			</div>
			<div className="row p-4 justify-content-center">
				<div className="col-12 col-md-6">
					<NormalInput type="text" id="title" placeholder="Title" set={updateValue} value={plot.title} />
					<NormalInput type="text" id="genre" placeholder="Genre" set={updateValue} value={plot.genre} />
					<TextareaInput id="synopsis" placeholder="Synopsis" set={updateValue} value={plot.synopsis} />
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-6 d-flex justify-content-center">
					<button onClick={handleCreatePlot} className="btn-prin align-self-center">
						Save plot
					</button>
				</div>
			</div>
		</div>
	);
};
