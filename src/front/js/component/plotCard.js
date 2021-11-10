import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const PlotCard = ({ plot }) => {
	return (
		<Link to={`/myplots/${plot.id}`}>
			<li className="col-12 col-md-6">{plot.title}</li>
		</Link>
	);
};

PlotCard.propTypes = {
	plot: PropTypes.object
};
