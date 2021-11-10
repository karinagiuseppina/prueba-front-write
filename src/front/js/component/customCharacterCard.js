import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const CustomCharacterCard = ({ character }) => {
	return (
		<Link to={`/mycharacters/${character.id}`}>
			<li className="col-12 col-md-6">{character.name}</li>
		</Link>
	);
};

CustomCharacterCard.propTypes = {
	character: PropTypes.object
};
