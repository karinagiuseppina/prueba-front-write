import React from "react";
import PropTypes from "prop-types";

export const NormalInput = ({ type, placeholder, set, value, id }) => {
	return (
		<>
			<label htmlFor={id}>{placeholder}</label>
			<input
				type={type}
				className="form-control border-0 border-bottom"
				id={id}
				placeholder={placeholder}
				onChange={e => set(id, e.target.value)}
				value={value}
			/>
		</>
	);
};

NormalInput.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.element,
	set: PropTypes.func,
	id: PropTypes.string
};
