import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FavoriteCharacterCard = ({ character, handleDeleteFavorite, handleSelectGender }) => {
	return (
		<div className="character-card" key={character.id}>
			<div className="character-card-header">
				<div
					className="text-muted align-self-end"
					onClick={() => {
						handleDeleteFavorite(character.id);
					}}>
					<i className="fas fa-times border-0" />
				</div>
				<h5>
					{character.name} {character.last_name}
				</h5>
				<p>
					<i className="fas fa-clock text-ter mx-1" /> {character.age} years
					<i className="fas fa-briefcase text-ter mx-1" /> {character.occupation}
					<i className="fas fa-street-view text-ter mx-1" /> {character.personality_name}
				</p>
			</div>
			<div className="character-card-body">{character.personality_desc}</div>
			<div
				className={`prompt-genre-character bg-${character.gender} mx-5`}
				onClick={() => handleSelectGender(character.gender)}>
				{character.gender}
			</div>
			<Link to={`/create-character/${character.id}`} className="align-self-center m-3">
				<button className="btn-prin">
					Make it my own
					<i className="fas fa-location-arrow mx-1" />
				</button>
			</Link>
		</div>
	);
};

FavoriteCharacterCard.propTypes = {
	character: PropTypes.object,
	handleDeleteFavorite: PropTypes.func,
	handleSelectGender: PropTypes.func
};
