import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const AllElementsListElement = ({ element, route }) => {
	return (
		<Link to={`/${route}/${element.id}`} className="text-decoration-none">
			<div className="all-elements-list-element">{element.name ? element.name : element.title}</div>
		</Link>
	);
};

AllElementsListElement.propTypes = {
	element: PropTypes.object,
	route: PropTypes.string
};
