import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FavoriteCharacterCard = ({ character, handleDeleteFavorite, handleSelectGender }) => {
	return (
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
					<Link className="btn bg-prin text-white" to={`/create-character/${character.id}`}>
						Make it my own
						<i className="fas fa-location-arrow mx-1" />
					</Link>
				</div>
			</div>
		</div>
	);
};

FavoriteCharacterCard.propTypes = {
	character: PropTypes.object,
	handleDeleteFavorite: PropTypes.func,
	handleSelectGender: PropTypes.func
};
