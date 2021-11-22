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
