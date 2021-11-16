import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const SocietyCard = ({ society }) => {
	return (
		<div className="plot-list-element">
			<Link to={`/mysocieties/${society.id}`}>{society.name}</Link>
		</div>
	);
};

SocietyCard.propTypes = {
	society: PropTypes.object
};
