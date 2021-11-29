import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const SocietyRelatedElement = ({ delete_route, setSocieties, societies, society }) => {
	const { actions } = useContext(Context);

	const deleteSocietyFromElement = async () => {
		const resp = await actions.deleteFetch(`delete/${delete_route}/society/${society.id}`);
		if (resp.ok) {
			actions.setToast("success", "Society deleted!");
			actions.deleteElementFromStateList(setSocieties, societies, society.id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<li key={society.id}>
			<Link to={`/mysocieties/${society.id}`}>{society.name}</Link>
			<button onClick={deleteSocietyFromElement}>
				<i className="fas fa-times" />
			</button>
		</li>
	);
};

SocietyRelatedElement.propTypes = {
	delete_route: PropTypes.string,
	societies: PropTypes.array,
	society: PropTypes.object,
	setSocieties: PropTypes.func
};
