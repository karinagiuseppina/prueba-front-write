import React from "react";
import PropTypes from "prop-types";

export const TextareaInput = ({ placeholder, set, value, id }) => {
	return (
		<>
			<label htmlFor={id}>{placeholder}</label>
			<textarea
				className="form-control"
				id={id}
				style={{ height: "200px" }}
				onChange={e => set(id, e.target.value)}
				value={value}
				placeholder={placeholder}
			/>
		</>
	);
};

TextareaInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	set: PropTypes.func,
	id: PropTypes.string
};
