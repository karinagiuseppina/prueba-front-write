import React, { useState, useContext, useEffect } from "react";
import "../../styles/styles.scss";
import { useParams } from "react-router";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { PlotForm } from "../component/plotForm";

export const UpdatePlot = () => {
	const { actions, store } = useContext(Context);
	const [plot, setPlot] = useState({
		title: "",
		genre: "",
		synopsis: ""
	});
	const { plot_id } = useParams();

	useEffect(() => {
		getPlot();
	}, []);

	const getPlot = async () => {
		const plot = await actions.getUserElements(`user/plots/${plot_id}`);
		setPlot(plot);
	};

	const handleUpdatePlot = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/update-plot`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ plot: plot, plot_id: plot_id })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push(`/myplots/${plot_id}`);
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Update Plot</div>
				</div>
			</div>
			<PlotForm plot={plot} setPlot={setPlot} saveFunction={handleUpdatePlot} />
		</div>
	);
};
