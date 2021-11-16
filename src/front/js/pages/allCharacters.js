import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { CustomCharacterCard } from "../component/customCharacterCard";
import my_characters from "../../img/my-characters.png";

export const AllCharacters = () => {
	const { store, actions } = useContext(Context);
	const [customCharacters, setCustomCharacters] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [charactersSelected, setCharactersSelected] = useState([]);

	useEffect(() => {
		getUserCustomCharacters();
	}, []);

	useEffect(
		() => {
			let regular_exp = new RegExp(`${searchInput}`);
			let temp = [];
			for (let i = 0; i < customCharacters.length; i++) {
				let name = customCharacters[i].name.toLowerCase();
				if (regular_exp.test(name)) temp.push(customCharacters[i]);
			}
			setCharactersSelected(temp);
		},
		[searchInput]
	);

	const getUserCustomCharacters = async () => {
		const custom_characters = await actions.getUserElements("user/custom-characters");
		setCustomCharacters(custom_characters);
		setCharactersSelected(custom_characters);
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit">
						My <span> characters </span>
					</div>
					<div className="header-subtitle text-center">
						<Link to="//create-character">
							<button className="btn-prin">Create new character</button>
						</Link>
					</div>
				</div>
				<div className="col-12 col-md-6 text-center">
					<img src={my_characters} className="header-img" />
				</div>
			</div>

			<div className="row justify-content-center my-5">
				<div className="col-12 col-md-8">
					<input
						className="search-box"
						placeholder="Search plot"
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</div>
			</div>
			<div className="row m-auto justify-content-center mt-5">
				<div className="col-12 col-md-8 my-2">
					{charactersSelected.map(character => (
						<CustomCharacterCard character={character} key={character.id} />
					))}
				</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
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
		</div> */
}
