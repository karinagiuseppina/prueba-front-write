import React from "react";
import "../../styles/styles.scss";
import PropTypes from "prop-types";

export const HeaderTitle = ({ title, subtitle }) => {
	return (
		<div className="row">
			<div className="col-md-6 white-text text-center text-md-left mt-5 mb-5">
				<h1 className="h1-responsive font-weight-bold mt-5 w-75">{title}</h1>
				<hr className="hr-prin" />
				<h6 className="mb-4">{subtitle}</h6>
			</div>
		</div>
	);
};

HeaderTitle.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};
