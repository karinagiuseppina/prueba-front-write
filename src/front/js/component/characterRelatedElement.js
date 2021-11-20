import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const CharacterRelatedElement = ({ delete_route, setCharacters, characters, character }) => {
	const { actions } = useContext(Context);

	const deleteCharacterFromElement = async () => {
		const resp = await actions.deleteFetch(`delete/${delete_route}/character/${character.id}`);
		if (resp.ok) {
			actions.setToast("success", "Character deleted!");
			actions.deleteElementFromStateList(setCharacters, characters, character.id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<li key={character.id}>
			{character.name} <button onClick={deleteCharacterFromElement}>X</button>
		</li>
	);
};

CharacterRelatedElement.propTypes = {
	delete_route: PropTypes.string,
	characters: PropTypes.array,
	character: PropTypes.object,
	setCharacters: PropTypes.func
};
