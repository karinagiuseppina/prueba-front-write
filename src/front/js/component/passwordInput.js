import React from "react";
import "../../styles/styles.scss";
import PropTypes from "prop-types";

export const PasswordInput = ({ type, id, name, placeholder, handleVissibility, value, set, icon }) => {
	return (
		<div className="password-type">
			<div className="form-floating flex-grow-1">
				<input
					type={type}
					className="form-control border-0"
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={e => set(e.target.value)}
				/>
				<label htmlFor={id}>{name}</label>
			</div>
			<i className={icon} onClick={handleVissibility} />
		</div>
	);
};

PasswordInput.propTypes = {
	name: PropTypes.string,
	icon: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	handleVissibility: PropTypes.func,
	id: PropTypes.string,
	set: PropTypes.func
};
