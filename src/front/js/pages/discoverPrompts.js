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
				<div className="col-lg-12 col-xl-11 mx-auto">
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

{
	/* <div className="view">
			<div className="mask rgba-gradient d-flex justify-content-center align-items-center tot-height">
				<div className="container">
					<HeaderTitle
						title="Discover a new prompt"
						subtitle="Choose a genre and hit the button to find new stories."
					/>
					<div className="row">
						<div className="col-12 col-lg-8 m-auto">
							<div className="input-group mb-3">
								<select
									className="form-select flex-grow-1 bg-white border-black text-black p-2 rounded"
									value={genre}
									onChange={e => setGenre(e.target.value)}>
									{genresInHtml}
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 m-auto p-0">
							<PromptModal genre={genre} />
						</div>
					</div>
				</div>
			</div>
		</div> */
}
