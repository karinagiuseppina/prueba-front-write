import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const CharacterModal = () => {
	const { actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [character, setCharacter] = useState(null);
	const [classProperty, setClassProperty] = useState("buttonNotFavorite");
	const [favoriteAction, setFavoriteAction] = useState("Add to Favorites");
	const [characterId, setCharacterId] = useState(null);

	function handleOnFavorite() {
		if (classProperty === "buttonNotFavorite") {
			setClassProperty("buttonFavorite");
			setFavoriteAction("Remove from Favorites");
		} else {
			setClassProperty("buttonNotFavorite");
			setFavoriteAction("Add to Favorites");
		}
	}

	function handleOnFavorite() {
		if (classProperty === "buttonNotFavorite") {
			handleNotFavoriteToFavorite();
		} else {
			handleFavoriteToNotFavorite();
		}
	}
	const handleNotFavoriteToFavorite = () => {
		setClassProperty("buttonFavorite");
		setFavoriteAction("Remove from Favorites");
		addtofavorite();
	};

	const handleFavoriteToNotFavorite = () => {
		setClassProperty("buttonNotFavorite");
		setFavoriteAction("Add to Favorites");
		removefromfavorite();
	};

	const addtofavorite = async () => {
		const token = actions.getUserToken();
		if (token !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/add/favoritecharacters`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: token },
				body: JSON.stringify({ character: character })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We couldnt add the prompt");
			else {
				const data = await resp.json();
				setCharacterId(data["character_id"]);
				actions.setToast("success", "Character added to your favorites!");
			}
		} else {
			actions.setToast("warning", "Log in first!");
		}
	};
	const removefromfavorite = async () => {
		const token = actions.getUserToken();
		if (token !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoritecharacters`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: token },
				body: JSON.stringify({ character_id: characterId })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the character");
			else {
				const data = await resp.json();
				actions.setToast("error", "Character removed from your favorites!");
			}
		} else {
			actions.setToast("warning", "Log in first!");
		}
	};

	const handleRandomCharacter = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/randomcharacter`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (resp.ok) {
			const data = await resp.json();
			setCharacter(data);
			setClassProperty("buttonNotFavorite");
			setFavoriteAction("Add to Favorites");
			showModal();
		}
	};
	const handleNextCharacter = () => {
		handleRandomCharacter();
	};

	const showModal = () => {
		setModal(true);
	};

	const hideModal = () => {
		setModal(false);
	};
	return (
		<div className="text-center">
			<div className={Modal ? "modal d-flex" : "modal display-none"}>
				<section className={`modal-main bg-white text-start animate__animated animate__backInLeft`}>
					<div className="modal-wmi-header">
						<button type="button" onClick={hideModal} className="btn text-muted align-self-end">
							<i className="fas fa-times" />
						</button>
						<h3>{character ? `${character.name} ${character.last_name}` : ""} </h3>
						<button
							type="button"
							onClick={handleOnFavorite}
							className={classProperty}
							data-bs-toggle="tooltip"
							data-bs-placement="right"
							title={favoriteAction}
						/>
					</div>
					<p className="modal-wmi-subtitle">
						{character
							? `${character.age} years » ${character.occupation} » ${character.personality_name}`
							: ""}
					</p>
					<p>{character ? `${character.personality_desc}` : ""}</p>
					<div className="modal-wmi-footer">
						<button onClick={handleNextCharacter}>
							Next Character <i className="fas fa-chevron-right" />
						</button>
					</div>
				</section>
			</div>
			<button type="button" onClick={handleRandomCharacter} className="btn-prin mx-auto my-1 my-md-5 text-center">
				Discover possible Characters!
			</button>
		</div>
	);
};
