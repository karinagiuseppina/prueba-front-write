import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { SocietyForm } from "../component/societyForm";
import { useHistory } from "react-router";

export const UpdateSociety = () => {
	const { actions } = useContext(Context);
	const { society_id } = useParams();
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
	useEffect(() => {
		getSociety();
	}, []);

	const getSociety = async () => {
		const society = await actions.getUserElements(`user/societies/${society_id}`);
		setSociety(society);
	};

	const handleUpdateSociety = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/update-society`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ society: society, society_id: society_id })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
			history.push(`/mysocieties/${society_id}`);
		} else {
			actions.setToast("error", "Try again!");
		}
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Update Society</div>
				</div>
			</div>
			<SocietyForm society={society} setSociety={setSociety} saveFunction={handleUpdateSociety} />
		</div>
	);
};
