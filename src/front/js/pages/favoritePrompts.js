import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";

export const FavoritePrompts = () => {
	const { store, actions } = useContext(Context);
	const [prompts, setPrompts] = useState([]);
	const [prompstInHTML, setpromptsInHTML] = useState([]);
	const [genresInHTML, setGenreInHTML] = useState([]);
	const [genreSelected, setGenreSelected] = useState([]);

	useEffect(() => {
		actions.syncUserFromLocalStorage();
		getUserPrompts();
	}, []);

	useEffect(
		() => {
			if (genreSelected.length > 0) {
				let selectedPrompts = prompts.filter(belongsToGenre);
				buildPromptsHTML(selectedPrompts);
			} else {
				buildPromptsHTML(prompts);
			}
			buildGenresInHtml();
		},
		[genreSelected]
	);
	useEffect(
		() => {
			buildPromptsHTML(prompts);
		},
		[prompts]
	);

	const getUserPrompts = async () => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/favoriteprompts`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (resp.ok) {
			const favorite_prompts = await resp.json();
			setPrompts(favorite_prompts);
		}
	};

	const belongsToGenre = prompt => {
		return genreSelected.includes(prompt.genre);
	};

	const handleDeleteFavorite = async id => {
		await removefromfavorite(id);
		let index = prompts.findIndex(prompt => id === prompt.prompt_id);
		if (index !== -1) {
			let fav = [...prompts];
			fav.splice(index, 1);
			setPrompts(fav);
		}
	};

	const removefromfavorite = async id => {
		const user_id = store.user && store.user !== undefined ? store.user["localId"] : null;
		if (user_id !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt_id: id, user_id: user_id })
			});
			if (resp.ok) {
				const data = await resp.json();
			}
		}
	};

	const buildPromptsHTML = prompts_array => {
		setpromptsInHTML(
			prompts_array.map(prompt => (
				<div className="card" key={prompt.prompt_id}>
					<div className="card-body">
						<div
							className="text-muted text-right"
							onClick={() => {
								handleDeleteFavorite(prompt.prompt_id);
							}}>
							<i className="fas fa-times border-0" />
						</div>
						<p className="card-text text-justify">{prompt.prompt}</p>
						<p
							className={`prompt-genre bg-${prompt.genre}`}
							onClick={() => handleSelectGenre(prompt.genre)}>
							{prompt.genre}
						</p>
					</div>
				</div>
			))
		);
	};

	const handleSelectGenre = genre => {
		let index = genreSelected.findIndex(g => g === genre);
		index !== -1 ? deleteGenreSelected(index) : setGenreSelected([...genreSelected, genre]);
	};

	const deleteGenreSelected = index => {
		let genres = [...genreSelected];
		genres.splice(index, 1);
		setGenreSelected(genres);
	};

	const buildGenresInHtml = () =>
		setGenreInHTML(
			store.genres.map(genre => {
				return (
					<button
						key={genre}
						className={
							genreSelected.includes(genre) ? "prompt-genre mx-4 bg-prin" : "prompt-genre mx-4 bg-white"
						}
						onClick={() => handleSelectGenre(genre)}>
						{genre}
					</button>
				);
			})
		);

	return (
		<div className="container">
			<h1>Favorite Prompts</h1>
			<div className="row p-4">
				<div className="col d-flex justify-content-center">{genresInHTML}</div>
			</div>
			<div className="row">
				<div className="col card-columns">{prompstInHTML} </div>
			</div>
		</div>
	);
};
