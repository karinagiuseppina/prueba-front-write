import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";

export const CharacterModal = () => {
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
					<h3 className="text-beige p-2">Jane Doe </h3>
					<button
						type="button"
						onClick={handleOnFavorite}
						className={classProperty}
						data-bs-toggle="tooltip"
						data-bs-placement="right"
						title={favoriteAction}
					/>
					<hr className="hr-prin" />
					<p className="text-justify text-white my-4">Personalidad aquí. </p>
					<a className="align-self-end button-next">
						Next Prompt <i className="fas fa-chevron-right" />
					</a>
				</section>
			</div>
			<div className="col-12 col-lg-8 m-auto">
				<button type="button" onClick={showModal} className="btn bg-black w-100 text-white">
					Discover possible Characters!
				</button>
			</div>
		</div>
	);
};
