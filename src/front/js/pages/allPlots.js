import React from "react";
import plots_img from "../../img/Prompts.png";
import { AllElements } from "../component/allElements";

export const AllPlots = () => {
	return <AllElements elements_plural="plots" elements_singular="plot" img={plots_img} add_route="/create-plot" />;
};
