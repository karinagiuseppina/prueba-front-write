import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { DiscoverPrompts } from "./pages/discoverPrompts";
import { EditProfile } from "./pages/editProfile";
import { FavoritePrompts } from "./pages/favoritePrompts";
import { AllPlots } from "./pages/allPlots";
import { AllCharacters } from "./pages/allCharacters";
import { DetailedPlot } from "./pages/detailedPlot";
import { DetailedCharacter } from "./pages/detailedCharacter";
import { DiscoverCharacters } from "./pages/discoverCharacters";
import { FavoriteCharacters } from "./pages/favoriteCharacters";
import { Login } from "./pages/login";
import { SignUp } from "./pages/SignUp";
import { CreateCharacter } from "./pages/createCharacter";
import { UpdateCustomCharacterForm } from "./pages/updateCharacterForm";
import { AllSocieties } from "./pages/allsocieties";
import { CreatePlot } from "./pages/createPlot";
import { UpdatePlot } from "./pages/updatePlot";
import { CreateSociety } from "./pages/createSociety";
import { DetailedSociety } from "./pages/detailedSociety";
import { UpdateSociety } from "./pages/updateSociety";

import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Navbar } from "./component/navbar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="app">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<main>
						<Navbar />
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/login">
								<Login />
							</Route>
							<Route exact path="/register">
								<SignUp />
							</Route>
							<Route exact path="/discoverPrompts">
								<DiscoverPrompts />
							</Route>
							<Route exact path="/discoverCharacters">
								<DiscoverCharacters />
							</Route>
							<Route exact path="/create-character/">
								<CreateCharacter />
							</Route>
							<Route exact path="/create-character/:fav_character">
								<CreateCharacter />
							</Route>
							<Route exact path="/update-character/:character_id">
								<UpdateCustomCharacterForm />
							</Route>
							<Route exact path="/mycharacters">
								<AllCharacters />
							</Route>
							<Route exact path="/mycharacters/:character_id">
								<DetailedCharacter />
							</Route>
							<Route exact path="/create-plot">
								<CreatePlot />
							</Route>
							<Route exact path="/update-plot/:plot_id">
								<UpdatePlot />
							</Route>
							<Route exact path="/myplots">
								<AllPlots />
							</Route>
							<Route exact path="/myplots/:plot_id">
								<DetailedPlot />
							</Route>
							<Route exact path="/create-society">
								<CreateSociety />
							</Route>
							<Route exact path="/mysocieties">
								<AllSocieties />
							</Route>
							<Route exact path="/mysocieties/:society_id">
								<DetailedSociety />
							</Route>
							<Route exact path="/update-society/:society_id">
								<UpdateSociety />
							</Route>
							<Route exact path="/editmyprofile">
								<EditProfile />
							</Route>
							<Route exact path="/favoriteprompts">
								<FavoritePrompts />
							</Route>
							<Route exact path="/favoritecharacters">
								<FavoriteCharacters />
							</Route>

							<Route>
								<h1>Not found!</h1>
							</Route>
						</Switch>
						{/* <Footer /> */}
					</main>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
