import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

export const Formgroup = ({ type, name, placeholder, set, value }) => {
	return (
		<div className="form-group d-flex flex-column w-100 px-4 py-1">
			<label className="text-prin font-sec font-weight-bold">{name}</label>
			<input
				type={type}
				className="form-control border-top-0 border-right-0 border-left-0 rounded-0 w-auto px-0"
				placeholder={placeholder}
				onChange={e => set(e.target.value)}
				value={value}
			/>
		</div>
	);
};

Formgroup.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	set: PropTypes.func
};
