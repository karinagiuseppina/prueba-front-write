import React, { useState, useContext } from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";

export const PromptModal = () => {
	const { store, actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [Genre, setGenre] = useState(null);
	const [actualPrompt, setActualPrompt] = useState(null);
	const [possiblePrompts, setPossiblePrompts] = useState([]);
	const [classProperty, setClassProperty] = useState("buttonNotFavorite");
	const [favoriteAction, setFavoriteAction] = useState("Add to Favorites");

	function handleOnClick() {
		if (classProperty === "buttonNotFavorite") {
			setClassProperty("buttonFavorite");
			setFavoriteAction("Remove from Favorites");
		} else {
			setClassProperty("buttonNotFavorite");
			setFavoriteAction("Add to Favorites");
		}
	}

	let prompts = [
		{
			genre: "fantasy",
			prompt:
				"Write about a character who finds an odd-looking egg in the forest. When they take it home, they never could have predicted what was inside it."
		},
		{
			genre: "fantasy",
			prompt:
				"Write a book about a character who has always had the ability to change how they looked, and so they hid their true appearance behind attractive façades. Now, their abilities aren’t working, exposing what they truly look like."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a story about once peaceful water dwellers who have suddenly declared war on a settlement that was its only true ally. Your character has no idea why and is thrust into the war against their will."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write about a character who wakes up in a space pod alone…next to a ship so massive it’s actually carrying a planet beneath it. Your character has no memory from before they wake."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a story about a character who lives in a world where every single person’s DNA is carefully genetically designed for something to help the community. Your main character despises what they were created for. This has never happened before."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write about how your character lives on a planet other than Earth. In fact, they don’t even know Earth exists. Well, they didn’t until some sort of advanced, technical probe crash-landed in their settlement, exposing the fact that they’re not alone. Now they have to decide what’s best for their settlement."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a book about how the world used to be plagued with war and famine and inhumanity. But after years and years of developing a technical system that is the center of and controls everything, it’s almost completely peaceful. Your character is the engineer keeping the system running and when they uncover how it works, they contemplate abandoning everything they know."
		},
		{
			genre: "science fiction",
			prompt: "ciencia 1"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 2"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 3"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 4"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 5"
		},
		{
			genre: "dystopian",
			prompt: "disto 1"
		},
		{
			genre: "dystopian",
			prompt: "disto 2"
		},
		{
			genre: "dystopian",
			prompt: "disto 3"
		},
		{
			genre: "dystopian",
			prompt: "disto 4"
		},
		{
			genre: "contemporary",
			prompt: "cont 1"
		},
		{
			genre: "contemporary",
			prompt: "cont 2"
		},
		{
			genre: "contemporary",
			prompt: "cont 3"
		},
		{
			genre: "contemporary",
			prompt: "cont 4"
		},
		{
			genre: "romance",
			prompt: "rom 4"
		},
		{
			genre: "romance",
			prompt: "rom 3"
		},
		{
			genre: "romance",
			prompt: "rom 2"
		},
		{
			genre: "romance",
			prompt: "rom 41"
		},
		{
			genre: "thriller",
			prompt: "thri 4"
		},
		{
			genre: "thriller",
			prompt: "thri 41"
		},
		{
			genre: "thriller",
			prompt: "thri 42"
		},
		{
			genre: "thriller",
			prompt: "thri 43"
		},
		{
			genre: "mystery",
			prompt: "mist 4"
		},
		{
			genre: "mystery",
			prompt: "mist 3"
		},
		{
			genre: "mystery",
			prompt: "mist 2"
		},
		{
			genre: "mystery",
			prompt: "mist 1"
		}
	];

	const handleSelectPrompt = () => {
		let genreSelected = document.getElementById("inputGroupSelectGenre").value;
		if (genreSelected !== "none") {
			setGenre(genreSelected);
			let filteredPrompts = prompts.filter(
				prompt => prompt.genre.toLocaleLowerCase() === genreSelected.toLocaleLowerCase()
			);
			setPossiblePrompts(filteredPrompts);
			selectPrompt(filteredPrompts);
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
				<section className="modal-main">
					<button type="button" onClick={hideModal} className="btn text-muted align-self-end">
						<i className="fas fa-times" />
					</button>
					<h3 className="text-beige p-2">New {Genre} prompt </h3>
					<button
						type="button"
						onClick={handleOnClick}
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
