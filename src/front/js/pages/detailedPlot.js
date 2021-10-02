import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.scss";

export const DetailedPlot = () => {
	return (
		<div className="container">
			<h1>Title</h1>
			<div className="d-flex flex-wrap justify-content-center">
				- Title - Genre - Synopsys - Has Chronology - Has Characters - Has Society
			</div>
			<Link to="/myplots">go back</Link>
		</div>
	);
};
