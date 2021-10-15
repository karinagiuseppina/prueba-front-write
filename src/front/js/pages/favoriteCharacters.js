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
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/favoritecharacters`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
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
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoritecharacters`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ character_id: id, user_id: user_id })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the character");
			else {
				const data = await resp.json();
				actions.setToast("error", "Character removed from your favorites!");
			}
		}
	};

	const buildCharactersHTML = characters_array => {
		setCharactersInHTML(
			characters_array.map(character => (
				<div className="col-12 col-md-6" key={character.id}>
					<div className="card my-2">
						<div className="card-header">
							<div
								className="text-muted text-right"
								onClick={() => {
									handleDeleteFavorite(character.id);
								}}>
								<i className="fas fa-times border-0" />
							</div>
							<h5 className="card-title text-center text-dark">
								{character.name} {character.last_name}
							</h5>
							<h6 className="card-subtitle mb-2 text-cuar text-center">
								<i className="fas fa-clock text-ter mx-1" /> {character.age} years
								<i className="fas fa-briefcase text-ter mx-1" /> {character.occupation}
								<i className="fas fa-street-view text-ter mx-1" /> {character.personality_name}
							</h6>
						</div>
						<div className="card-body">
							<p className="card-text text-justify fs-6 overflow-auto" style={{ maxHeight: "200px" }}>
								{character.personality_desc}
							</p>
							<p
								className={`prompt-genre bg-${character.gender}`}
								onClick={() => handleSelectGender(character.gender)}>
								{character.gender}
							</p>
						</div>
						<div className="card-footer text-center">
							<button className="btn bg-prin text-white">
								Make it my own
								<i className="fas fa-location-arrow mx-1" />
							</button>
						</div>
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
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto p-4">
					<div className="row my-3 border-0 shadow rounded-3 overflow-auto bg-white">
						<div className="col-12 bg-prin p-5 d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">My Favorite Characters</h1>
						</div>
						<div className="row p-4">
							<div className="col d-flex justify-content-center">{gendersInHTML}</div>
						</div>
						<div className="row p-5">{charactersInHTML}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
