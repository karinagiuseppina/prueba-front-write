import React from "react";
import PropTypes from "prop-types";
import { NormalInput } from "../component/normalInput";
import { TextareaInput } from "../component/textareaInput";

export const SocietyForm = ({ society, setSociety, saveFunction }) => {
	const updateValue = (attr, value) => {
		let old_value = { ...society };
		old_value[attr] = value;
		setSociety(old_value);
	};
	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-4">
					<NormalInput
						type="text"
						id="name"
						placeholder="Society name"
						set={updateValue}
						value={society.name}
					/>

					<NormalInput
						type="text"
						id="language"
						placeholder="Language(s)"
						set={updateValue}
						value={society.language}
					/>
					<NormalInput
						type="text"
						id="government"
						placeholder="Type of government"
						set={updateValue}
						value={society.government}
					/>
				</div>
				<div className="col-12 col-md-4">
					<NormalInput
						type="text"
						id="demonym"
						placeholder="Demonym(s)"
						set={updateValue}
						value={society.demonym}
					/>
					<NormalInput
						type="text"
						id="ethnic_groups"
						placeholder="Ethnic Group(s)"
						set={updateValue}
						value={society.ethnic_groups}
					/>
					<NormalInput
						type="text"
						id="population"
						placeholder="Population"
						set={updateValue}
						value={society.population}
					/>
				</div>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<TextareaInput
						id="culture"
						placeholder="Cultural aspects"
						set={updateValue}
						value={society.culture}
					/>
					<TextareaInput
						id="basic_needs"
						placeholder="Basic Needs"
						set={updateValue}
						value={society.basic_needs}
					/>
					<TextareaInput
						id="social_needs"
						placeholder="Social needs"
						set={updateValue}
						value={society.social_needs}
					/>
					<TextareaInput
						id="entertainment"
						placeholder="Entertainment aspects"
						set={updateValue}
						value={society.entertainment}
					/>
					<TextareaInput
						id="comfort"
						placeholder="Comfort aspects"
						set={updateValue}
						value={society.comfort}
					/>
					<TextareaInput
						id="reproduction_needs"
						placeholder="Reproduction needs"
						set={updateValue}
						value={society.reproduction_needs}
					/>
				</div>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8 text-center">
					<button onClick={saveFunction} className="btn-prin">
						Save Society
					</button>
				</div>
			</div>
		</div>
	);
};
SocietyForm.propTypes = {
	society: PropTypes.object,
	setSociety: PropTypes.func,
	saveFunction: PropTypes.func
};
