import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { SignupModal } from "./signupModal";
import { LoginModal } from "./loginModal";
import { Context } from "../store/appContext";
import logo from "../../img/loguito.png";

export const Navbar = () => {
	const token = localStorage.getItem("token");
	const { actions } = useContext(Context);
	let history = useHistory();

	const handleLogOut = () => {
		actions.deleteUserSession();
		history.push("/");
	};

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
				<a className="dropdown-item text-dark" href="#">
					Favorite Prompts
				</a>
				<a className="dropdown-item text-dark" href="#">
					Organize my plots
				</a>
				<a className="dropdown-item text-dark" href="#">
					My Characters
				</a>
				<div className="dropdown-divider" />
				<a className="dropdown-item text-dark" href="#">
					Configure
				</a>
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
								<Link className="nav-link" to="/">
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

{
	/* <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
				<img src={rigoImageUrl} width="30" height="30" />
				<a className="navbar-brand" href="#">
					Write Me In
				</a>
				<button
					className="navbar-toggler collapsed"
					type="button"
					data-toggle="collapse"
					data-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="navbar-collapse collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item d-flex justify-content-center align-items-center">
							<i className="fas fa-feather-alt" />
							<Link className="nav-link" to="/discoverPrompts">
								Discover Prompts
							</Link>
						</li>
						<li className="nav-item d-flex justify-content-center align-items-center">
							<i className="fas fa-user-ninja" />
							<Link className="nav-link" to="/">
								Discover Characters
							</Link>
						</li>
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
							<div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
								<a className="dropdown-item text-light" href="#">
									<i className="fas fa-star" /> Favorite Prompts
								</a>
								<a className="dropdown-item text-light" href="#">
									<i className="fas fa-quote-right" /> Organize my plots
								</a>
								<a className="dropdown-item text-light" href="#">
									<i className="fas fa-user-edit" /> My Characters
								</a>
								<div className="dropdown-divider" />
								<a className="dropdown-item text-light" href="#">
									<i className="fas fa-cog" /> Configure
								</a>
								<a className="dropdown-item text-light" href="#">
									<i className="fas fa-sign-out-alt" /> Log Out
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav> */
}
