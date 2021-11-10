import React, { useState, useContext, useEffect } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { TextareaInput } from "../component/textareaInput";
import { Link } from "react-router-dom";

export const CreateSociety = () => {
	const { actions, store } = useContext(Context);
	const [society, setSociety] = useState({
		name: "",
		language: "",
		ethnic_groups: "",
		demonym: "",
		population: "",
		government: "",
		culture: "",
		basic_needs: "",
		social_needs: "",
		entertainment: "",
		comfort: "",
		reproduction_needs: ""
	});

	const handleCreateSociety = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/create-society`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ society: society })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	const updateValue = (attr, value) => {
		let old_society = { ...society };
		old_society[attr] = value;
		setSociety(old_society);
	};

	let normalInputs = ["name", "language", "ethnic_groups", "demonym", "population", "government"].map(attr => (
		<NormalInput key={attr} type="text" id={attr} placeholder={attr} set={updateValue} value={society[attr]} />
	));

	let textareaInputs = [
		"culture",
		"basic_needs",
		"social_needs",
		"entertainment",
		"comfort",
		"reproduction_needs"
	].map(attr => <TextareaInput key={attr} id={attr} placeholder={attr} set={updateValue} value={society[attr]} />);

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<div className="d-flex my-3 justify-content-start">
								<Link to="/mysocieties">Go to all Societies</Link>
							</div>
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">Build Society</h1>
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
								id="ethnic_groups"
								placeholder="Ethnic Group(s)"
								set={updateValue}
								value={society.ethnic_groups}
							/>
							<NormalInput
								type="text"
								id="demonym"
								placeholder="Demonym(s)"
								set={updateValue}
								value={society.demonym}
							/>
							<NormalInput
								type="text"
								id="population"
								placeholder="Population"
								set={updateValue}
								value={society.population}
							/>
							<NormalInput
								type="text"
								id="government"
								placeholder="Type of government"
								set={updateValue}
								value={society.government}
							/>
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

							<div className="d-flex my-3 justify-content-center">
								<button
									onClick={handleCreateSociety}
									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
									Save Society
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
