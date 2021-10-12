import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { PromptModal } from "./promptModal";
import { HeaderTitle } from "../component/HeaderTitle";

export const DiscoverPrompts = () => {
	const { store } = useContext(Context);
	const [genre, setGenre] = useState("fantasy");

	let genres = store.genres;

	let genresInHtml = genres.map(function(genre) {
		return (
			<option key={genre} value={genre}>
				{genre}
			</option>
		);
	});

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto">
					<div className="row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="col-12 col-md-6 discover-prompt-image d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">Discover Prompts</h1>
						</div>
						<div className="col-12 col-md-6 card-body p-4 p-sm-5 bg-white">
							<p>
								There are many variations of passages of Lorem Ipsum available, but the majority have
								suffered alteration in some form, by injected humour, or randomised words which dont
								look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
								need to be sure there isnt anything embarrassing hidden in the middle of text. All the
								Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
								making this the first true generator on the Internet. It uses a dictionary of over 200
								Latin words, combined with a handful of model sentence structures, to generate Lorem
								Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from
								repetition, injected humour, or non-characteristic words etc.
							</p>
							<div className="input-group mb-3">
								<select
									className="form-select flex-grow-1 bg-white border-black text-black p-2 rounded"
									value={genre}
									onChange={e => setGenre(e.target.value)}>
									{genresInHtml}
								</select>
							</div>
							<PromptModal genre={genre} />
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
