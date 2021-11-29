import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavbarItems } from "./navbarItems";

export const Navbar = () => {
	const { actions } = useContext(Context);
	let history = useHistory();
	const [isClicked, setIsClicked] = useState(false);

	const handleClicked = () => {
		setIsClicked(!isClicked);
	};

	const handleLogOut = () => {
		actions.deleteUserSession();
		history.push("/");
	};
	const getInspiredItems = [
		{
			title: "Discover Prompts",
			link: "/discoverPrompts",
			sub: "Discover new prompt ideas",
			icon: "far fa-lightbulb"
		},
		{
			title: "Discover Characters",
			link: "/discoverCharacters",
			sub: "Discover new character ideas",
			icon: "far fa-user-circle"
		}
	];
	const myUniverseItems = [
		{
			title: "My Plots",
			link: "/myplots",
			sub: "View my plots",
			icon: "far fa-edit"
		},
		{
			title: "Favorite Prompts",
			link: "/favoritePrompts",
			sub: "View favorite prompts",
			icon: "far fa-star"
		},
		{
			title: "My Characters",
			link: "/mycharacters",
			sub: "View my designed characters",
			icon: "far fa-user"
		},
		{
			title: "Favorite Characters",
			link: "/favoritecharacters",
			sub: "View favorite characters",
			icon: "far fa-star"
		},
		{
			title: "My Societies",
			link: "/mysocieties",
			sub: "View my Societies",
			icon: "fas fa-globe-americas"
		},
		{
			title: "Edit profile",
			link: "/editmyprofile",
			sub: "Edit my information",
			icon: "fas fa-cog"
		}
	];

	const logIn = (
		<div className="menu-link">
			<Link to="/login">Log In</Link>
		</div>
	);

	const logOut = (
		<>
			<NavbarItems title="My Universe" columns="double" items={myUniverseItems} />
			<div className="menu-link" onClick={handleLogOut}>
				Log Out
			</div>
		</>
	);
	const logInResponsive = (
		<li>
			<div className="mobile-nav-link">
				<Link to="/login">Log In</Link>
			</div>
		</li>
	);

	const logOutResponsive = (
		<>
			<li>
				<div className="mobile-nav-category">My Universe</div>
			</li>
			{myUniverseItems.map(item => (
				<li key={item.title}>
					<div className="mobile-nav-link">
						<Link to={item.link}>{item.title}</Link>
					</div>
				</li>
			))}
			<li>
				<div className="mobile-nav-link" onClick={handleLogOut}>
					Log Out
				</div>
			</li>
		</>
	);

	const responsiveMenu = (
		<div className="navbar-items-wrapper">
			<ul className={isClicked ? "nav-menu active" : "nav-menu"}>
				<li>
					<div className="mobile-nav-category">Get Inspired!</div>
				</li>
				{getInspiredItems.map(item => (
					<li key={item.title}>
						<div className="mobile-nav-link">
							<Link to={item.link}>{item.title}</Link>
						</div>
					</li>
				))}
				{actions.getUserToken() === null ? logInResponsive : logOutResponsive}
			</ul>
		</div>
	);

	return (
		<nav>
			<div className="nav-logo">
				<Link to="/">WRITEMEIN</Link>
			</div>
			<div className="desktop-navbar">
				<NavbarItems title="Get Inspired" columns="" items={getInspiredItems} />
				{actions.getUserToken() === null ? logIn : logOut}
			</div>
			<div className="mobile-navbar">
				<div className="menu-icon" onClick={handleClicked}>
					{isClicked ? <i className="fas fa-times" /> : <i className="fas fa-bars" />}
				</div>

				{responsiveMenu}
			</div>
		</nav>
	);
};
