import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { SocietyCard } from "../component/societyCard";
import plots_img from "../../img/Prompts.png";
import { AllElements } from "../component/allElements";

export const AllSocieties = () => {
	return (
		<AllElements
			elements_plural="societies"
			elements_singular="society"
			img={plots_img}
			add_route="/create-society"
		/>
	);
};
