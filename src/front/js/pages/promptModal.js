import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";

export const PromptModal = ({ genre }) => {
	const { store, actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [actualPrompt, setActualPrompt] = useState(null);
	const [possiblePrompts, setPossiblePrompts] = useState([]);
	const [classProperty, setClassProperty] = useState("buttonNotFavorite");
	const [favoriteAction, setFavoriteAction] = useState("Add to Favorites");

	function handleOnFavorite() {
		if (classProperty === "buttonNotFavorite") {
			setClassProperty("buttonFavorite");
			setFavoriteAction("Remove from Favorites");
		} else {
			setClassProperty("buttonNotFavorite");
			setFavoriteAction("Add to Favorites");
		}
	}

	const handleSelectPrompt = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/prompts/${genre}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (!resp.ok) setActualPrompt("ERROR!");
		else {
			const prompts = await resp.json();
			setPossiblePrompts(prompts);
			selectPrompt(prompts);
		}
	};
	const handleNextPrompt = () => {
		selectPrompt(possiblePrompts);
	};
	const selectPrompt = PromptList => {
		let choosedPrompt = actions.getRandom(PromptList.length);
		setActualPrompt(PromptList[choosedPrompt].prompt);
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
					<p className="text-justify text-white my-4">{actualPrompt}</p>
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
