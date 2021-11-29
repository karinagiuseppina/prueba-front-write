import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddSocietyRelationshipButton = ({ body, route, setSocieties, societies }) => {
	const { actions } = useContext(Context);

	async function handleAddSociety() {
		let societies = await actions.getUserElements(`user/name/societies`);
		let society = await actions.setModalSelection("society", societies);
		if (society) {
			addSocietyToElement({ id: society, name: societies[society] });
		}
	}

	const addSocietyToElement = async society => {
		body["society"] = society;
		const resp = await actions.addRelationshipBetweenElements(route, body);
		if (resp.ok) {
			actions.setToast("success", "Society added!");
			setSocieties([...societies, society]);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<button onClick={handleAddSociety}>
			<i className="fas fa-plus-circle" />
		</button>
	);
};

AddSocietyRelationshipButton.propTypes = {
	setSocieties: PropTypes.func,
	body: PropTypes.object,
	route: PropTypes.string,
	societies: PropTypes.array
};
