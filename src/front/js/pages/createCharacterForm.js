import React, { useState, useContext, useEffect } from "react";
import "../../styles/styles.scss";
import { useParams } from "react-router";
import { Context } from "../store/appContext";
import { CharacterForm } from "../component/characterForm";
import { useHistory } from "react-router";

export const CreateCustomCharacterForm = () => {
	const { actions, store } = useContext(Context);
	let { fav_character } = useParams();
	let history = useHistory();
	const [character, setCharacter] = useState({
		name: "",
		nickname: "",
		age: "",
		occupation: "",
		nationality: "",
		eye_color: "",
		hair_color: "",
		skin_color: "",
		gender: "",
		sexual_orientation: "",
		personality: "",
		appearence: ""
	});

	useEffect(() => {
		if (fav_character !== undefined) {
			handleGetDataFavoriteCharacter(fav_character);
		}
	}, []);

	const handleGetDataFavoriteCharacter = async id => {
		const data = await actions.getUserElements(`user/favoritecharacters/${id}`);
		let old_character = { ...character };
		old_character["name"] = `${data.name} ${data.last_name}`;
		old_character["occupation"] = data.occupation;
		old_character["personality"] = data.personality_desc;
		old_character["gender"] = data.gender;
		setCharacter(old_character);
	};

	const handleCreateCharacter = async () => {
		const resp = await actions.createElement("create-character", { character: character });
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push("/mycharacters");
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Create new character</div>
				</div>
			</div>
			<CharacterForm character={character} setCharacter={setCharacter} saveFunction={handleCreateCharacter} />
		</div>
	);
};
