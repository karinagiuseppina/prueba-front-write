import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const PlotRelatedElement = ({ delete_route, setPlots, plots, plot }) => {
	const { actions } = useContext(Context);

	const delete_plot_from_element = async () => {
		const resp = await actions.deleteFetch(`delete/plot/${plot.id}/${delete_route}`);
		if (resp.ok) {
			actions.setToast("success", "Plot deleted!");
			actions.deleteElementFromStateList(setPlots, plots, plot.id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<li key={plot.id}>
			<Link to={`/myplots/${plot.id}`}>{plot.title} </Link>
			<button onClick={delete_plot_from_element}>
				<i className="fas fa-times" />
			</button>
		</li>
	);
};

PlotRelatedElement.propTypes = {
	delete_route: PropTypes.string,
	plots: PropTypes.array,
	plot: PropTypes.object,
	setPlots: PropTypes.func
};
