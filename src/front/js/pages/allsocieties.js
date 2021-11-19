import React from "react";
import "../../styles/styles.scss";
import plots_img from "../../img/Prompts.png";
import { AllElements } from "../component/allElements";

export const AllSocieties = () => {
	return (
		<AllElements
			elements_plural="societies"
			elements_singular="society"
			img={plots_img}
			add_route="/create-society"
		/>
	);
};
