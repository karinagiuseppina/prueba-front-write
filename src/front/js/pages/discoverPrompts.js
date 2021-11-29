import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PromptModal } from "./promptModal";
import prompt_img from "../../img/discover_prompts.png";

export const DiscoverPrompts = () => {
	const { store } = useContext(Context);
	const [genreSelected, setGenreSelected] = useState(null);
	const [genreInHTML, setGenreInHTML] = useState([]);

	useEffect(
		() => {
			setGenreInHTML(
				store.genres.map(genre => {
					return (
						<button
							key={genre}
							className={
								genreSelected === genre ? "prompt-genre m-4 bg-prin text-white" : "prompt-genre m-4"
							}
							onClick={() => setGenreSelected(genre)}>
							{genre}
						</button>
					);
				})
			);
		},
		[genreSelected]
	);

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center px-1 px-md-5">
				<div className="col-12 col-md-6">
					<div className="header-tit">
						Discover <span>Prompts </span>
					</div>
					<div className="header-subtitle">
						Discover Prompts allows you to select a gender and discover new prompt ideas related to that
						gender. A prompt means to give a cue to you, in order to help you focus on a specific topic,
						task, or purpose. In this way, writing prompts are a type of assessment or activity that directs
						individuals to write about a given topic in a certain way.
					</div>
				</div>
				<div className="col-12 col-md-6 text-center">
					<img src={prompt_img} className="header-img" />
				</div>
			</div>
			<div className="row m-auto">
				<div className="col-12">
					<div className="basic-info">
						<p>{`Let's get started!`}</p>
						<h3>Choose a genre:</h3>
						<div className="d-flex flex-wrap justify-content-center align-items-center">{genreInHTML}</div>
						<PromptModal genre={genreSelected} />
					</div>
				</div>
			</div>
		</div>
	);
};
