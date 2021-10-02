import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.scss";

export const DetailedCharacter = () => {
	return (
		<div className="container">
			<h1>Jane Doe</h1>
			<div className="d-flex flex-wrap justify-content-center">
				- Nickname - Age - Occupation - Nationality - Race - Eye Color - Hair Color - Skin Color - Sexual
				Orientation - Image?? - Personality - Appearence
			</div>
			<Link to="/mycharacters">go back</Link>
		</div>
	);
};
