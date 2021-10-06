import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";

export const CharacterModal = () => {
	const { store, actions } = useContext(Context);
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
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/add/favoritecharacters`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ character: character, user_id: user_id })
			});
			if (resp.ok) {
				const data = await resp.json();
				setCharacterId(data["character_id"]);
			}
		}
	};
	const removefromfavorite = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(
				`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/delete/favoritecharacters`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ character_id: characterId, user_id: user_id })
				}
			);
			if (resp.ok) {
				const data = await resp.json();
			}
		}
	};

	const handleRandomCharacter = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/randomcharacter`, {
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
		<div>
			<div className={Modal ? "modal display-block" : "modal display-none"}>
				<section className="modal-main p-4 bg-black">
					<button type="button" onClick={hideModal} className="btn text-muted align-self-end">
						<i className="fas fa-times" />
					</button>
					<h3 className="text-beige p-2">{character ? `${character.name} ${character.last_name}` : ""} </h3>
					<button
						type="button"
						onClick={handleOnFavorite}
						className={classProperty}
						data-bs-toggle="tooltip"
						data-bs-placement="right"
						title={favoriteAction}
					/>
					<hr className="hr-prin" />
					<p className="text-justify text-white my-4">
						{character
							? `${character.age} || ${character.occupation} || ${character.personality_name}`
							: ""}
					</p>
					<p className="text-justify text-white my-4">{character ? `${character.personality_desc}` : ""} </p>
					<a className="align-self-end button-next" onClick={handleNextCharacter}>
						Next Character <i className="fas fa-chevron-right" />
					</a>
				</section>
			</div>
			<div className="col-12 col-lg-8 m-auto">
				<button type="button" onClick={handleRandomCharacter} className="btn bg-black w-100 text-white">
					Discover possible Characters!
				</button>
			</div>
		</div>
	);
};
