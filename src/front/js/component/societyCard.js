import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const SocietyCard = ({ society }) => {
	return (
		<Link to={`/mysocieties/${society.id}`}>
			<li className="col-12 col-md-6">{society.name}</li>
		</Link>
	);
};

SocietyCard.propTypes = {
	society: PropTypes.object
};
