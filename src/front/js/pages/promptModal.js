import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import "animate.css";

export const PromptModal = ({ genre }) => {
	const { store, actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [actualPrompt, setActualPrompt] = useState(null);
	const [possiblePrompts, setPossiblePrompts] = useState([]);
	const [isFavorite, setIsFavorite] = useState([]);
	const [classProperty, setClassProperty] = useState("buttonNotFavorite");
	const [favoriteAction, setFavoriteAction] = useState("Add to Favorites");

	const handleSelectGenre = async () => {
		genre === null ? actions.setToast("warning", "You need to select a genre first!") : getPossiblePrompts();
	};

	const getPossiblePrompts = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/prompts/${genre}`, {
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
		setIsFavorite(fav);
	};
	const checkIsFavorite = prompt_id => {
		return isFavorite.includes(prompt_id);
	};
	const handleFavoriteToNotFavorite = () => {
		setClassProperty("buttonNotFavorite");
		setFavoriteAction("Add to Favorites");
		let index = isFavorite.findIndex(prompt => prompt === actualPrompt.prompt_id);
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
			const resp = await fetch(`${process.env.BACKEND_URL}/api/add/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: actualPrompt, user_id: user_id })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We couldnt add the prompt");
			else {
				const data = await resp.json();
				actions.setToast("success", "Prompt added to your favorites!");
			}
		}
	};
	const removefromfavorite = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt_id: actualPrompt["prompt_id"], user_id: user_id })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the prompt");
			else {
				const data = await resp.json();
				actions.setToast("error", "Prompt removed from your favorites!");
			}
		}
	};

	return (
		<div>
			<div className={Modal ? "modal d-flex" : "modal display-none"}>
				<section className={`modal-main bg-white rounded text-start animate__animated animate__backInLeft`}>
					<div className="d-flex flex-column bg-sec p-3 rounded">
						<button type="button" onClick={hideModal} className="btn text-muted align-self-end">
							<i className="fas fa-times" />
						</button>
						<h3 className="text-white px-4 py-3 bg-sec">New {genre} prompt </h3>
						<button
							type="button"
							onClick={handleOnFavorite}
							className={classProperty}
							data-bs-toggle="tooltip"
							data-bs-placement="right"
							title={favoriteAction}
						/>
					</div>
					<p className="text-center text-dark m-4 p-3">
						{actualPrompt && actualPrompt !== undefined ? actualPrompt.prompt : ""}
					</p>
					<a onClick={handleNextPrompt} className="align-self-end button-next p-4">
						Next Prompt <i className="fas fa-chevron-right" />
					</a>
				</section>
			</div>
			<button type="button" onClick={handleSelectGenre} className="btn bg-prin text-white">
				Discover!
			</button>
		</div>
	);
};

PromptModal.propTypes = {
	genre: PropTypes.string
};
