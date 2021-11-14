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
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favoriteprompts`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
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
		const token = actions.getUserToken();
		if (token !== null) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/delete/favoriteprompts`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: token },
				body: JSON.stringify({ prompt_id: id })
			});
			if (!resp.ok) actions.setToast("warning", "Sorry! We could not remove the prompt");
			else {
				const data = await resp.json();
				actions.setToast("success", "Prompt removed from your favorites!");
			}
		}
	};

	const buildPromptsHTML = prompts_array => {
		setpromptsInHTML(
			prompts_array.map(prompt => (
				<div className="prompt-card" key={prompt.prompt_id}>
					<div
						className="text-muted align-self-end"
						onClick={() => {
							handleDeleteFavorite(prompt.prompt_id);
						}}>
						<i className="fas fa-times border-0" />
					</div>
					<p>{prompt.prompt}</p>
					<div
						className={`prompt-genre-hashtag bg-${prompt.genre}`}
						onClick={() => handleSelectGenre(prompt.genre)}>
						{prompt.genre}
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
							genreSelected.includes(genre) ? "prompt-genre m-4 bg-prin text-white" : "prompt-genre m-4"
						}
						onClick={() => handleSelectGenre(genre)}>
						{genre}
					</button>
				);
			})
		);

	return (
		<div className="container-fluid p-0">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit short-header">
						Favorite <span>Prompts</span>
					</div>
				</div>
			</div>
			<div className="row p-4">
				<div className="col d-flex justify-content-center flex-wrap">{genresInHTML}</div>
			</div>
			<div className="row m-auto">
				<div className="col-12 col-md-8 grid-wrapper m-auto">{prompstInHTML}</div>
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
							<h1 className="card-title text-uppercase fs-1 text-white">My Favorite Prompts</h1>
						</div>
						<div className="row p-4">
							<div className="col d-flex justify-content-center">{genresInHTML}</div>
						</div>
						<div className="row p-5">{prompstInHTML}</div>
					</div>
				</div>
			</div>
		</div> */
}
