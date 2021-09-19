import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/styles.scss";
import { HomeServiceCard } from "../component/HomeServiceCard";
import { HeaderTitle } from "../component/HeaderTitle";

export const Home = () => {
	let title = "One plot, infinite stories";
	return (
		<div className="view">
			<div className="mask rgba-gradient d-flex justify-content-center align-items-center tot-height">
				<div className="container">
					<div className="row">
						<div className="col-md-6 white-text text-center text-md-left mt-5 mb-5">
							<h1 className="h1-responsive font-weight-bold mt-5 w-75">
								One plot,
								<br /> infinite stories
							</h1>
							<h6 className="mb-4">Let your inner writer go wild!</h6>
						</div>
					</div>
					<div className="row">
						<HomeServiceCard
							icon="fas fa-feather-alt"
							title="Discover Prompts"
							text="Generate possible prompt ideas based on a specific gender, and don&apos;t forget
										to save it if it inspires you!"
							buttonText="New ideas, please!"
							link="/discoverPrompts"
						/>
						<HomeServiceCard
							icon="fas fa-user-ninja"
							title="Discover Characters"
							text="Generate possible character ideas, and don&apos;t forget to save it if it
										inspires you!"
							buttonText="New characters, please!"
							link="/discoverCharacters"
						/>
						<HomeServiceCard
							icon="fas fa-quote-right"
							title="Design Plots"
							text="Organize and prepare everything for your next book, no details left behind"
							buttonText="Make it happen!"
							link="/myPlots"
						/>
						<HomeServiceCard
							icon="fas fa-user-edit"
							title="Design Characters"
							text="Build your own characters from scratch and always revisit to add new details. "
							buttonText="Begin creation!"
							link="/myCharacters"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid mt-5 p-4 d-flex flex-column justify-content-center bg-img-index">
			<div className="row">
				<h2>
					One plot, <br />
					infinite stories
				</h2>
			</div>
			<div className="row">

			</div>
		</div> */
}
