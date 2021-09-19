import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

export const Formgroup = ({ id, type, name, placeholder, set, value }) => {
	return (
		<div className="form-group d-flex w-100 my-3">
			<label className="text-light mx-4 w-25">{name}</label>
			<input
				type={type}
				className="form-control"
				placeholder={placeholder}
				onChange={e => set(e.target.value)}
				value={value}
			/>
		</div>
	);
};

Formgroup.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	set: PropTypes.func
};
