import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { PromptModal } from "../component/promptModal";
import { HeaderTitle } from "../component/HeaderTitle";

export const DiscoverPrompts = () => {
	const { store, actions } = useContext(Context);

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
									id="inputGroupSelectGenre">
									<option value="none" defaultValue>
										Choose Genre...
									</option>
									<option value="fantasy">Fantasy</option>
									<option value="sci-fi">Sci-fi</option>
									<option value="dystopian">Dystopian</option>
									<option value="contemporary">Contemporary</option>
									<option value="romance">Romance</option>
									<option value="thriller">Thriller</option>
									<option value="mystery">Mystery</option>
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 m-auto p-0">
							<PromptModal />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// <div className="container-fluid text-center mt-5 p-4 tot-height d-flex flex-column justify-content-center">
// 			<div className="row">
// 				<div className="col">
// 					<h1>Writing Prompts</h1>
// 				</div>
// 			</div>
// 			<div className="row">
// 				<div className="col-8 m-auto">
// 					<div className="input-group mb-3">
// 						<label
// 							className="input-group-text bg-dark text-secondary rounded-0 border-secondary mx-1"
// 							htmlFor="inputGroupSelect01">
// 							Choose Genre
// 						</label>
// 						<select
// 							className="form-select flex-grow-1 bg-dark border border-secondary text-secondary"
// 							id="inputGroupSelect01">
// 							<option selected>Choose...</option>
// 							<option value="1">Fantasy</option>
// 							<option value="2">Sci-fi</option>
// 							<option value="3">Dystopian</option>
// 							<option value="4">Contemporary</option>
// 							<option value="5">Romance</option>
// 							<option value="6">Thriller</option>
// 							<option value="7">Mystery</option>
// 						</select>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="row">
// 				<div className="col-8 m-auto">
// 					<PromptModal />
// 				</div>
// 			</div>
// 		</div>
