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

import injectContext from "./store/appContext";

import { Sidebar } from "./component/sidebar";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);

	const handleCollapsedChange = checked => {
		setCollapsed(checked);
	};

	const handleToggleSidebar = value => {
		setToggled(value);
	};

	return (
		<div className={`app ${toggled ? "toggled" : ""}`}>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Sidebar
						toggled={toggled}
						collapsed={collapsed}
						handleToggleSidebar={handleToggleSidebar}
						handleCollapsedChange={handleCollapsedChange}
					/>
					<main>
						<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 448 512"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
							</svg>
						</div>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/discoverPrompts">
								<DiscoverPrompts />
							</Route>
							<Route exact path="/discoverCharacters">
								<DiscoverCharacters />
							</Route>
							<Route exact path="/mycharacters">
								<AllCharacters />
							</Route>
							<Route exact path="/mycharacters/:id">
								<DetailedCharacter />
							</Route>
							<Route exact path="/myplots">
								<AllPlots />
							</Route>
							<Route exact path="/myplots/:id">
								<DetailedPlot />
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
						<Footer />
					</main>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
