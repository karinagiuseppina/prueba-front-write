import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddCharacterRelationshipButton = ({ body, route, setCharacters, characters }) => {
	const { actions } = useContext(Context);

	async function handleAddCharacter() {
		const characters = await actions.getUserElements(`user/name/custom-characters`);
		let character = await actions.setModalSelection("character", characters);
		if (character) {
			addCharacterToElement({ id: character, name: characters[character] });
		}
	}

	const addCharacterToElement = async character => {
		body["character"] = character;
		const resp = await actions.addRelationshipBetweenElements(route, body);
		if (resp.ok) {
			actions.setToast("success", "Character added!");
			setCharacters([...characters, character]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<button onClick={handleAddCharacter}>
			<i className="fas fa-plus-circle" />
		</button>
	);
};

AddCharacterRelationshipButton.propTypes = {
	setCharacters: PropTypes.func,
	body: PropTypes.object,
	route: PropTypes.string,
	characters: PropTypes.array
};
