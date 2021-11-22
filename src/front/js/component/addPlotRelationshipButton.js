import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddPlotRelationshipButton = ({ body, route, setPlots, plots }) => {
	const { actions } = useContext(Context);

	async function handleAddPlot() {
		const plots = await actions.getUserElements(`user/name/plots`);
		let plot = await actions.setModalSelection("plots", plots);

		if (plot) {
			addPlotToElement({ id: plot, title: plots[plot] });
		}
	}

	const addPlotToElement = async plot => {
		body["plot"] = plot;
		const resp = await actions.addRelationshipBetweenElements(route, body);
		if (resp.ok) {
			actions.setToast("success", "Plot added!");
			setPlots([...plots, plot]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<button onClick={handleAddPlot}>
			<i className="fas fa-plus-circle" />
		</button>
	);
};

AddPlotRelationshipButton.propTypes = {
	setPlots: PropTypes.func,
	body: PropTypes.object,
	route: PropTypes.string,
	plots: PropTypes.array
};
