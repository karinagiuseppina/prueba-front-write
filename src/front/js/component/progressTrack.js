import React from "react";
import PropTypes from "prop-types";

export const ProgressTrack = ({ children }) => {
	return (
		<div className="row justify-content-center">
			<div className="col-12 d-flex justify-content-center">
				<div className="track">{children}</div>
			</div>
		</div>
	);
};

ProgressTrack.propTypes = {
	children: PropTypes.node
};
