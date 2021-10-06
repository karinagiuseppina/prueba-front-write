import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SignupModal } from "../pages/signupModal";
import { LoginModal } from "../pages/loginModal";
import { Context } from "../store/appContext";
import logo from "../../img/loguito.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const token = store.user && store.user !== undefined && store.user !== "" ? store.user["localId"] : null;

	const handleLogOut = () => {
		actions.deleteUserSession();
		history.push("/");
	};

	useEffect(() => {}, []);

	const logIn = (
		<>
			<li className="nav-item d-flex justify-content-center align-items-center">
				<LoginModal />
			</li>
			<li className="nav-item d-flex justify-content-center align-items-center">
				<SignupModal />
			</li>
		</>
	);

	const logOut = (
		<li className="nav-item dropdown">
			<a
				className="nav-link dropdown-toggle"
				href="#"
				id="navbarDropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false">
				My profile
			</a>
			<div className="dropdown-menu bg-white" aria-labelledby="navbarDropdown">
				<Link className="dropdown-item text-dark" to="/favoriteprompts">
					Favorite Prompts
				</Link>
				<Link className="dropdown-item text-dark" to="/favoritecharacters">
					Favorite Characters
				</Link>
				<Link className="dropdown-item text-dark" to="/myplots">
					My plots
				</Link>
				<Link className="dropdown-item text-dark" to="/mycharacters">
					My Characters
				</Link>
				<div className="dropdown-divider" />
				<Link className="dropdown-item text-dark" to="/editmyprofile">
					Configure
				</Link>
				<button className="dropdown-item text-dark" onClick={handleLogOut}>
					Log Out
				</button>
			</div>
		</li>
	);

	return (
		<header>
			<nav className="navbar navbar-light navbar-expand-lg bg-white scrolling-navbar p-3 border-bottom-gray">
				<div className="container">
					<Link className="logo-nav" to="/">
						<img src={logo} />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent-7"
						aria-controls="navbarSupportedContent-7"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent-7">
						<ul className="navbar-nav">
							<li className="nav-item d-flex justify-content-center align-items-center">
								<Link className="nav-link" to="/discoverPrompts">
									Discover Prompts
								</Link>
							</li>
							<li className="nav-item d-flex justify-content-center align-items-center">
								<Link className="nav-link" to="/discoverCharacters">
									Discover Characters
								</Link>
							</li>
							{token && token !== undefined && token !== "" ? logOut : logIn}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
