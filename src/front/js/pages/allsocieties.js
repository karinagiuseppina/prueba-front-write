import React from "react";
import society_img from "../../img/my-societies.png";
import { AllElements } from "../component/allElements";

export const AllSocieties = () => {
	return (
		<AllElements
			elements_plural="societies"
			elements_singular="society"
			img={society_img}
			add_route="/create-society"
		/>
	);
};
