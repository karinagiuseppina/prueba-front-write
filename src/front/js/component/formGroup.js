import React from "react";
import PropTypes from "prop-types";

export const Formgroup = ({ type, name, placeholder, set, value, id }) => {
	return (
		<div className="form-floating mb-3">
			<input
				type={type}
				className="form-control"
				id={id}
				placeholder={placeholder}
				onChange={e => set(e.target.value)}
				value={value}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	);
};

Formgroup.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	set: PropTypes.func,
	id: PropTypes.string
};
