import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { PromptModal } from "./promptModal";

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
								genreSelected === genre ? "prompt-genre m-4 bg-prin" : "prompt-genre m-4 bg-white"
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
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto p-4">
					<div className="row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="col-12 col-md-6 discover-prompt-image d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">Discover Prompts</h1>
						</div>
						<div className="col-12 col-md-6 card-body p-4 p-sm-5 bg-white text-center">
							<p>Choose a genre and discover new prompts!</p>
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
