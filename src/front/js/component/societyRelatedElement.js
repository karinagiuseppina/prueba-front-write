import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

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
			{society.name} <button onClick={deleteSocietyFromElement}>X</button>
		</li>
	);
};

SocietyRelatedElement.propTypes = {
	delete_route: PropTypes.string,
	societies: PropTypes.array,
	society: PropTypes.object,
	setSocieties: PropTypes.func
};
