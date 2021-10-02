import React, { useState } from "react";
import "../../styles/styles.scss";
import { PromptModal } from "./promptModal";
import { HeaderTitle } from "../component/HeaderTitle";

export const DiscoverPrompts = () => {
	const [genre, setGenre] = useState("fantasy");

	let genres = ["fantasy", "sci-fi", "dystopian", "contemporary", "romance", "thriller", "mystery"];

	let genresInHtml = genres.map(function(genre) {
		return (
			<option key={genre} value={genre}>
				{genre}
			</option>
		);
	});

	return (
		<div className="view">
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
		</div>
	);
};
