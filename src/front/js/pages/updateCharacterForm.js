import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { CharacterForm } from "../component/characterForm";
import { useHistory } from "react-router";

export const UpdateCustomCharacterForm = () => {
	const { actions } = useContext(Context);
	let history = useHistory();
	const { character_id } = useParams();
	const [character, setCharacter] = useState({
		name: "",
		nickname: "",
		age: "",
		occupation: "",
		nationality: "",
		eye_color: "",
		hair_color: "",
		skin_color: "",
		sexual_orientation: "",
		personality: "",
		appearence: ""
	});

	useEffect(() => {
		getCharacter();
	}, []);

	const getCharacter = async () => {
		const custom_character = await actions.getUserElements(`user/custom-characters/${character_id}`);
		setCharacter(custom_character);
	};

	const handleUpdateCharacter = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/update-character`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ character: character, character_id: character_id })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push(`/mycharacters/${character_id}`);
		} else {
			actions.setToast("warning", "Try again later!");
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Update character</div>
				</div>
			</div>
			<CharacterForm character={character} setCharacter={setCharacter} saveFunction={handleUpdateCharacter} />
		</div>
	);
};
