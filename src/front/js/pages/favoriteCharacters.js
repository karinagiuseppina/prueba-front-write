import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { FavoriteCharacterCard } from "../component/favoriteCharacterCard";

export const FavoriteCharacters = () => {
	const { store, actions } = useContext(Context);
	const [favoriteCharacters, setFavoriteCharacters] = useState([]);
	const [charactersInHTML, setCharactersInHTML] = useState([]);
	const [gendersInHTML, setGendersInHTML] = useState([]);
	const [genderSelected, setGenderSelected] = useState([]);

	useEffect(() => {
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
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favoritecharacters`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
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
		const token = actions.getUserToken();
		if (token !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoritecharacters`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: token },
				body: JSON.stringify({ character_id: id })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the character");
			else {
				const data = await resp.json();
				actions.setToast("success", "Character removed from your favorites!");
			}
		}
	};
	const buildCharactersHTML = characters_array => {
		setCharactersInHTML(
			characters_array.map(character => (
				<FavoriteCharacterCard
					key={character.id}
					character={character}
					handleDeleteFavorite={handleDeleteFavorite}
					handleSelectGender={handleSelectGender}
				/>
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
							genderSelected.includes(gender)
								? "prompt-genre mx-4 bg-prin text-white"
								: "prompt-genre mx-4"
						}
						onClick={() => handleSelectGender(gender)}>
						{gender}
					</button>
				);
			})
		);

	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit short-header">
						Favorite <span>Characters</span>
					</div>
				</div>
			</div>
			<div className="row p-4">
				<div className="col d-flex justify-content-center flex-wrap mt-5">{gendersInHTML}</div>
			</div>
			<div className="row m-auto">
				<div className="col-12 grid-wrapper mx-auto">{charactersInHTML}</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
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
		</div> */
}
