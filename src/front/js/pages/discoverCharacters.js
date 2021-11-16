import React from "react";
import { CharacterModal } from "./characterModal";
import characters_img from "../../img/discover_characters.png";

export const DiscoverCharacters = () => {
	return (
		<div className="container p-2 p-md-5 h-tot">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit">
						Discover <br />
						<span>Characters </span>
					</div>
					<div className="header-subtitle">
						Discover characters allows you to generate a random character in order to get inspired for your
						main or secondary characters. Get a hint of their personality, their age, name and surname. If
						you like it, you can add it to your favorites and customize it to make it yours.
						<CharacterModal />
					</div>
				</div>
				<div className="col-12 col-md-6 text-center">
					<img src={characters_img} className="header-img" />
				</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto p-4">
					<div className="row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="col-12 col-md-6 discover-prompt-image d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">Discover Characters</h1>
						</div>
						<div className="col-12 col-md-6 card-body p-4 p-sm-5 bg-white text-center">
							<p>Let the magic begin!</p>
							<CharacterModal />
						</div>
					</div>
				</div>
			</div>
		</div> */
}
