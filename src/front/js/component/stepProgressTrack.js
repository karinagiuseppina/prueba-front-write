import React from "react";
import PropTypes from "prop-types";

export const StepProgressTrack = ({ icon, text, isActive }) => {
	return (
		<div className={`step ${isActive ? "active" : ""}`}>
			<span className="icon">
				<i className={icon} />
			</span>
		</div>
	);
};
/* <span className="text">{text}</span> */

StepProgressTrack.propTypes = {
	icon: PropTypes.string,
	text: PropTypes.string,
	isActive: PropTypes.bool
};
