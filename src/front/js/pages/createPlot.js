import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { PlotForm } from "../component/plotForm";
import { useHistory } from "react-router";

export const CreatePlot = () => {
	const { actions, store } = useContext(Context);
	let history = useHistory();
	const [plot, setPlot] = useState({
		title: "",
		genre: "",
		synopsis: ""
	});

	const handleCreatePlot = async () => {
		const resp = await actions.createElement("create-plot", { plot: plot });
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push("/myplots");
		} else {
			actions.setToast("warning", "Try again later!");
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Create new Plot</div>
				</div>
			</div>
			<PlotForm plot={plot} setPlot={setPlot} saveFunction={handleCreatePlot} />
		</div>
	);
};
