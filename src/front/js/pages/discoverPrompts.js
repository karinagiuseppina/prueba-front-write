import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { PromptModal } from "./promptModal";
import prompt_img from "../../img/Prompts.png";

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
		<div className="basic-gradient">
			<div className="container-fluid p-0">
				<div className="full-screen">
					<div className="row justify-content-center align-items-center">
						<div className="col-12 col-md-6">
							<div className="header-tit">
								Discover <br />
								<span>Prompts </span>
							</div>
							<div className="header-subtitle">
								Discover Prompts allows you to select a gender and discover new prompt ideas related to
								that gender. A prompt means to give a cue to you, in order to help you focus on a
								specific topic, task, or purpose. In this way, writing prompts are a type of assessment
								or activity that directs individuals to write about a given topic in a certain way.
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img src={prompt_img} className="header-img" />
						</div>
					</div>
				</div>
				<div className="row m-auto">
					<div className="col-12">
						<div className="basic-info">
							<p>{`Let's get started!`}</p>
							<h3>Choose a genre:</h3>
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{genreInHTML}
							</div>
							<PromptModal genre={genreSelected} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// <div className="container-fluid m-0 bg-gradiente">
// 			<div className="row tot-height align-items-center">
// 				<div className="col-lg-12 col-xl-11 mx-auto p-4">
// 					<div className="row my-3 border-0 shadow rounded-3 overflow-hidden">
// 						<div className="col-12 col-md-6 discover-prompt-image d-flex align-items-center justify-content-center">
// 							<h1 className="card-title text-uppercase fs-1 text-white">Discover Prompts</h1>
// 						</div>
// 						<div className="col-12 col-md-6 card-body p-4 p-sm-5 bg-white text-center">
// 							<p>Choose a genre and discover new prompts!</p>
// <div className="d-flex flex-wrap justify-content-center align-items-center">
// 	{genreInHTML}
// </div>
// <PromptModal genre={genreSelected} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
