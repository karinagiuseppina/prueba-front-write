import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { HomeServiceCard } from "../component/HomeServiceCard";
import maquina from "../../img/Maquina.png";

export const Home = () => {
	return (
		<div className="gradient">
			<div className="container">
				<div className="header">
					<div className="row align-items-center row">
						<div className="col-12 col-md-6">
							<div className="header-tit">
								One plot, <br />
								<span>infinite stories </span>
							</div>
							<div className="header-subtitle">
								Welcome to Write Me In, little stranger! We hope you are ready to find your inner writer
								and let your creativity run wild, the world wants to read what you have to write.
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img src={maquina} className="header-img" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// <div className="row">
// 						<HomeServiceCard
// 							icon="fas fa-feather-alt"
// 							title="Discover Prompts"
// 							text="Generate possible prompt ideas based on a specific gender, and don&apos;t forget
// 										to save it if it inspires you!"
// 							buttonText="New ideas, please!"
// 							link="/discoverPrompts"
// 						/>
// 						<HomeServiceCard
// 							icon="fas fa-user-ninja"
// 							title="Discover Characters"
// 							text="Generate possible character ideas, and don&apos;t forget to save it if it
// 										inspires you!"
// 							buttonText="New characters, please!"
// 							link="/discoverCharacters"
// 						/>
// 						<HomeServiceCard
// 							icon="fas fa-quote-right"
// 							title="Design Plots"
// 							text="Organize and prepare everything for your next book, no details left behind"
// 							buttonText="Make it happen!"
// 							link="/myPlots"
// 						/>
// 						<HomeServiceCard
// 							icon="fas fa-user-edit"
// 							title="Design Characters"
// 							text="Build your own characters from scratch and always revisit to add new details. "
// 							buttonText="Begin creation!"
// 							link="/myCharacters"
// 						/>
// 					</div>
