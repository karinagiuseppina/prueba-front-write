import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const CustomCharacterCard = ({ character }) => {
	return (
		<div className="plot-list-element">
			<Link to={`/mycharacters/${character.id}`}>{character.name}</Link>
		</div>
	);
};

CustomCharacterCard.propTypes = {
	character: PropTypes.object
};
