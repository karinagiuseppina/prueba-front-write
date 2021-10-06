import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";

export const FavoriteCharacters = () => {
	const { store, actions } = useContext(Context);
	const [favoriteCharacters, setFavoriteCharacters] = useState([]);
	const [charactersInHTML, setCharactersInHTML] = useState([]);
	const [gendersInHTML, setGendersInHTML] = useState([]);
	const [genderSelected, setGenderSelected] = useState([]);

	useEffect(() => {
		actions.syncUserFromLocalStorage();
		getUserFavoriteCharacters();
	}, []);

	useEffect(
		() => {
			if (genderSelected.length > 0) {
				let selectedCharacters = favoriteCharacters.filter(belongsToGender);
				buildCharactersHTML(selectedCharacters);
			} else {
				buildCharactersHTML(favoriteCharacters);
			}
			buildGendersInHtml();
		},
		[genderSelected]
	);
	useEffect(
		() => {
			buildCharactersHTML(favoriteCharacters);
		},
		[favoriteCharacters]
	);

	const getUserFavoriteCharacters = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		const resp = await fetch(
			`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/user/${user_id}/favoritecharacters`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" }
			}
		);
		if (resp.ok) {
			const favorite_characters = await resp.json();
			setFavoriteCharacters(favorite_characters);
		}
	};

	const belongsToGender = character => {
		return genderSelected.includes(character.gender);
	};

	const handleDeleteFavorite = async id => {
		await removefromfavorite(id);
		let index = favoriteCharacters.findIndex(character => id === character.id);
		if (index !== -1) {
			let fav = [...favoriteCharacters];
			fav.splice(index, 1);
			setFavoriteCharacters(fav);
		}
	};

	const removefromfavorite = async id => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(
				`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/delete/favoritecharacters`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ character_id: id, user_id: user_id })
				}
			);
			if (resp.ok) {
				const data = await resp.json();
			}
		}
	};

	const buildCharactersHTML = characters_array => {
		setCharactersInHTML(
			characters_array.map(character => (
				<div className="card" key={character.id}>
					<div className="card-body">
						<div
							className="text-muted text-right"
							onClick={() => {
								handleDeleteFavorite(character.id);
							}}>
							<i className="fas fa-times border-0" />
						</div>
						<h5 className="card-title">
							{character.name} {character.last_name}
						</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							{character.age} - {character.occupation} - {character.personality_name}
						</h6>
						<p className="card-text text-justify">{character.personality_desc}</p>
						<p
							className={`prompt-genre bg-${character.gender}`}
							onClick={() => handleSelectGender(character.gender)}>
							{character.gender}
						</p>
					</div>
				</div>
			))
		);
	};

	const handleSelectGender = gender => {
		let index = genderSelected.findIndex(g => g === gender);
		index !== -1 ? deleteGenderSelected(index) : setGenderSelected([...genderSelected, gender]);
	};

	const deleteGenderSelected = index => {
		let genders = [...genderSelected];
		genders.splice(index, 1);
		setGenderSelected(genders);
	};

	const buildGendersInHtml = () =>
		setGendersInHTML(
			store.genders.map(gender => {
				return (
					<button
						key={gender}
						className={
							genderSelected.includes(gender) ? "prompt-genre mx-4 bg-prin" : "prompt-genre mx-4 bg-white"
						}
						onClick={() => handleSelectGender(gender)}>
						{gender}
					</button>
				);
			})
		);

	return (
		<div className="container">
			<h1>Favorite Prompts</h1>
			<div className="row p-4">
				<div className="col d-flex justify-content-center">{gendersInHTML}</div>
			</div>
			<div className="row">
				<div className="col card-columns">{charactersInHTML} </div>
			</div>
		</div>
	);
};
