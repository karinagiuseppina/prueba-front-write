import React, { useState } from "react";
import "../../styles/styles.scss";
import { CharacterModal } from "./characterModal";
import { HeaderTitle } from "../component/HeaderTitle";

export const DiscoverCharacters = () => {
	return (
		<div className="view">
			<div className="mask rgba-gradient d-flex justify-content-center align-items-center tot-height">
				<div className="container">
					<HeaderTitle
						title="Discover a new prompt"
						subtitle="Choose a genre and hit the button to find new stories."
					/>
					<div className="row">
						<div className="col-12 m-auto p-0">
							<CharacterModal />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
