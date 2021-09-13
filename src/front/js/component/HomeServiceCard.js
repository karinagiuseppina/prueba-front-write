import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const HomeServiceCard = ({ icon, title, text, buttonText, link }) => {
	return (
		<div className="col-12 col-md-6 col-lg-3">
			<div className="card bg-black text-white my-2 h-38">
				<div className="card-body d-flex flex-column justify-content-stretch align-items-stretch">
					<i className={icon + " p-2 m-1 text-beige align-self-start"} />
					<h5 className="card-title text-beige">{title}</h5>

					<p className="card-text text-justify flex-grow-1">{text}</p>
					<Link to={link} className="btn bg-white w-100">
						{buttonText}
					</Link>
				</div>
			</div>
		</div>
	);
};

HomeServiceCard.propTypes = {
	icon: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	buttonText: PropTypes.string,
	link: PropTypes.string
};
