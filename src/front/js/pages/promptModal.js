import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";

export const PromptModal = ({ genre }) => {
	const { store, actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [actualPrompt, setActualPrompt] = useState(null);
	const [possiblePrompts, setPossiblePrompts] = useState([]);
	const [isFavorite, setIsFavorite] = useState([]);
	const [classProperty, setClassProperty] = useState("buttonNotFavorite");
	const [favoriteAction, setFavoriteAction] = useState("Add to Favorites");

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
		let fav = isFavorite;
		fav.push(actualPrompt.prompt_id);
		console.log(fav);
		setIsFavorite(fav);
	};
	const checkIsFavorite = prompt_id => {
		return isFavorite.includes(prompt_id);
	};
	const handleFavoriteToNotFavorite = () => {
		setClassProperty("buttonNotFavorite");
		setFavoriteAction("Add to Favorites");
		let index = isFavorite.findIndex(prompt => prompt === actualPrompt.prompt_id);
		console.log(index);
		if (index !== -1) {
			let fav = isFavorite;
			fav.splice(index, 1);
			setIsFavorite(fav);
		}
		removefromfavorite();
	};

	const addtofavorite = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/add/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: actualPrompt, user_id: user_id })
			});
			if (!resp.ok) setActualPrompt("ERROR!");
			else {
				const data = await resp.json();
			}
		}
	};
	const removefromfavorite = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/delete/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt_id: actualPrompt["prompt_id"], user_id: user_id })
			});
			if (!resp.ok) setActualPrompt("ERROR!");
			else {
				const data = await resp.json();
			}
		}
	};

	const handleSelectPrompt = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/prompts/${genre}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (!resp.ok) setActualPrompt("ERROR!");
		else {
			const data = await resp.json();
			setPossiblePrompts(data);
			selectPrompt(data);
		}
	};
	const handleNextPrompt = () => {
		selectPrompt(possiblePrompts);
	};
	const selectPrompt = PromptList => {
		let choosedPrompt = actions.getRandom(PromptList.length);
		setActualPrompt(PromptList[choosedPrompt]);
		if (checkIsFavorite(PromptList[choosedPrompt].prompt_id)) setClassProperty("buttonFavorite");
		else setClassProperty("buttonNotFavorite");
		showModal();
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
					<h3 className="text-beige p-2">New {genre} prompt </h3>
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
						{actualPrompt && actualPrompt !== undefined ? actualPrompt.prompt : ""}
					</p>
					<a onClick={handleNextPrompt} className="align-self-end button-next">
						Next Prompt <i className="fas fa-chevron-right" />
					</a>
				</section>
			</div>
			<div className="col-12 col-lg-8 m-auto">
				<button type="button" onClick={handleSelectPrompt} className="btn bg-black w-100 text-white">
					Discover!
				</button>
			</div>
		</div>
	);
};

PromptModal.propTypes = {
	genre: PropTypes.string
};
