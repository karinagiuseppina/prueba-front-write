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
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the prompt");
			else {
				const data = await resp.json();
				actions.setToast("error", "Prompt removed from your favorites!");
			}
		}
	};

	const buildPromptsHTML = prompts_array => {
		setpromptsInHTML(
			prompts_array.map(prompt => (
				<div className="col-12 col-md-6" key={prompt.prompt_id}>
					<div className="card my-2">
						<div className="card-body">
							<div
								className="text-muted text-right"
								onClick={() => {
									handleDeleteFavorite(prompt.prompt_id);
								}}>
								<i className="fas fa-times border-0" />
							</div>
							<p className="card-text text-justify overflow-auto" style={{ maxHeight: "150px" }}>
								{prompt.prompt}
							</p>
							<p
								className={`prompt-genre bg-${prompt.genre}`}
								onClick={() => handleSelectGenre(prompt.genre)}>
								{prompt.genre}
							</p>
						</div>
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
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto p-4">
					<div className="row my-3 border-0 shadow rounded-3 overflow-auto bg-white">
						<div className="col-12 bg-prin p-5 d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">My Favorite Prompts</h1>
						</div>
						<div className="row p-4">
							<div className="col d-flex justify-content-center">{genresInHTML}</div>
						</div>
						<div className="row p-5">{prompstInHTML}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
