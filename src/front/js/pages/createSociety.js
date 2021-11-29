import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { SocietyForm } from "../component/societyForm";
import { useHistory } from "react-router";

export const CreateSociety = () => {
	const { actions } = useContext(Context);
	let history = useHistory();
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
		const resp = await actions.createElement("create-society", { society: society });
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push(`/mysocieties`);
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Create new Society</div>
				</div>
			</div>
			<SocietyForm society={society} setSociety={setSociety} saveFunction={handleCreateSociety} />
		</div>
	);
};
