import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const PlotCard = ({ plot }) => {
	return (
		<div className="plot-list-element">
			<Link to={`/myplots/${plot.id}`}>{plot.title}</Link>
		</div>
	);
};

PlotCard.propTypes = {
	plot: PropTypes.object
};
