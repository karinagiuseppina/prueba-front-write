import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { CustomCharacterCard } from "../component/customCharacterCard";

export const AllCharacters = () => {
	const { store, actions } = useContext(Context);
	const [customCharacters, setCustomCharacters] = useState([]);

	useEffect(() => {
		getUserCustomCharacters();
	}, []);

	const getUserCustomCharacters = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/custom-characters`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const custom_characters = await resp.json();
			setCustomCharacters(custom_characters);
		}
	};

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">My characters</h1>
							<div className="d-flex my-3 justify-content-end">
								<button className="btn btn-prin fw-bold text-uppercase w-25 p-2">
									<Link to="/create-character" className="text-decoration-none text-white">
										Create new Character
									</Link>
								</button>
							</div>
							{customCharacters.map(character => (
								<CustomCharacterCard character={character} key={character.id} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
