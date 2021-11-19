import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import my_characters from "../../img/my-characters.png";
import { AllElements } from "../component/allElements";

export const AllCharacters = () => {
	return (
		<AllElements
			elements_plural="characters"
			elements_singular="character"
			img={my_characters}
			add_route="/create-character"
		/>
	);
};
