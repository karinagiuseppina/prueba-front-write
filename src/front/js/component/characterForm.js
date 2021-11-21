import React from "react";
import "../../styles/styles.scss";
import PropTypes from "prop-types";
import { NormalInput } from "../component/normalInput";
import { TextareaInput } from "../component/textareaInput";

export const CharacterForm = ({ character, setCharacter, saveFunction }) => {
	const updateValue = (attr, value) => {
		let old_character = { ...character };
		old_character[attr] = value;
		setCharacter(old_character);
	};
	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-4">
					<NormalInput
						type="text"
						id="name"
						placeholder="Full Name"
						set={updateValue}
						value={character.name}
					/>
					<NormalInput
						type="text"
						id="occupation"
						placeholder="Occupation"
						set={updateValue}
						value={character.occupation}
					/>
					<NormalInput
						type="text"
						id="gender"
						placeholder="Gender"
						set={updateValue}
						value={character.gender}
					/>
					<NormalInput
						type="text"
						id="hair_color"
						placeholder="Hair color"
						set={updateValue}
						value={character.hair_color}
					/>
					<NormalInput
						type="text"
						id="skin_color"
						placeholder="Skin Color"
						set={updateValue}
						value={character.skin_color}
					/>
				</div>
				<div className="col-12 col-md-4">
					<NormalInput
						type="text"
						id="nickname"
						placeholder="Nickname"
						set={updateValue}
						value={character.nickname}
					/>
					<NormalInput type="date" id="age" placeholder="Age" set={updateValue} value={character.age} />
					<NormalInput
						type="text"
						id="nationality"
						placeholder="Nationality"
						set={updateValue}
						value={character.nationality}
					/>
					<NormalInput
						type="text"
						id="sexual_orientation"
						placeholder="Sexual Orientation"
						set={updateValue}
						value={character.sexual_orientation}
					/>
					<NormalInput
						type="text"
						id="eye_color"
						placeholder="Eye Color"
						set={updateValue}
						value={character.eye_color}
					/>
				</div>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<TextareaInput
						id="personality"
						placeholder="Personality Description"
						set={updateValue}
						value={character.personality}
					/>
				</div>
			</div>
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-3" />
				<div className="col-12 col-md-3" />
				<div className="col-12 col-md-2" />
			</div>
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<TextareaInput
						id="appearence"
						placeholder="Appearence"
						set={updateValue}
						value={character.appearence}
					/>
				</div>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8 text-center">
					<button onClick={saveFunction} className="btn-prin">
						Save Character
					</button>
				</div>
			</div>
		</div>
	);
};
CharacterForm.propTypes = {
	character: PropTypes.object,
	setCharacter: PropTypes.func,
	saveFunction: PropTypes.func
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-img-left-create d-none d-md-flex" />
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">
								Build Custom Character
							</h1>

							<div className="accordion" id="accordionPanelsStayOpenExample">
								<div className="accordion-item">
									<h2 className="accordion-header" id="panelsStayOpen-headingOne">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#panelsStayOpen-collapseOne"
											aria-expanded="true"
											aria-controls="panelsStayOpen-collapseOne">
											General Information
										</button>
									</h2>
									<div
										id="panelsStayOpen-collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="panelsStayOpen-headingOne">
										<div className="accordion-body">
											<NormalInput
												type="text"
												id="name"
												placeholder="Name"
												set={updateValue}
												value={character.name}
											/>

											<NormalInput
												type="text"
												id="last_name"
												placeholder="Last Name"
												set={updateValue}
												value={character.last_name}
											/>

											<NormalInput
												type="text"
												id="nickname"
												placeholder="Nickname"
												set={updateValue}
												value={character.nickname}
											/>

											<NormalInput
												type="date"
												id="age"
												placeholder="Age"
												set={updateValue}
												value={character.age}
											/>
											<NormalInput
												type="text"
												id="occupation"
												placeholder="Occupation"
												set={updateValue}
												value={character.occupation}
											/>
											<NormalInput
												type="text"
												id="nationality"
												placeholder="Nationality"
												set={updateValue}
												value={character.nationality}
											/>
											<NormalInput
												type="text"
												id="sexual_orientation"
												placeholder="Sexual Orientation"
												set={updateValue}
												value={character.sexual_orientation}
											/>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="panelsStayOpen-headingTwo">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#panelsStayOpen-collapseTwo"
											aria-expanded="false"
											aria-controls="panelsStayOpen-collapseTwo">
											Physical Appearence
										</button>
									</h2>
									<div
										id="panelsStayOpen-collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="panelsStayOpen-headingTwo">
										<div className="accordion-body">
											<NormalInput
												type="text"
												id="race"
												placeholder="Race"
												set={updateValue}
												value={character.race}
											/>
											<NormalInput
												type="text"
												id="eye_color"
												placeholder="Eye Color"
												set={updateValue}
												value={character.eye_color}
											/>
											<NormalInput
												type="text"
												id="hair_color"
												placeholder="Hair color"
												set={updateValue}
												value={character.hair_color}
											/>
											<NormalInput
												type="text"
												id="skin_color"
												placeholder="Skin Color"
												set={updateValue}
												value={character.skin_color}
											/>
											<TextareaInput
												id="appearence"
												placeholder="Extra Info"
												set={updateValue}
												value={character.appearence}
											/>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="panelsStayOpen-headingThree">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#panelsStayOpen-collapseThree"
											aria-expanded="false"
											aria-controls="panelsStayOpen-collapseThree">
											Personality
										</button>
									</h2>
									<div
										id="panelsStayOpen-collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="panelsStayOpen-headingThree">
										<div className="accordion-body">
											<TextareaInput
												id="personality"
												placeholder="Personality Description"
												set={updateValue}
												value={character.personality}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="d-flex mb-2 justify-content-center">
								<button
									className="btn btn-prin fw-bold text-uppercase w-100 w-md-25 p-2"
									onClick={handleSignUp}>
									Register
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> */
}
