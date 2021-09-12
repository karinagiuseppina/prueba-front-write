import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Navbar = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
				<div className="container">
					<img src={rigoImageUrl} width="30" height="30" />
					<a className="navbar-brand" href="#">
						<strong>WRITEMEIN</strong>
					</a>
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
					<div className="collapse navbar-collapse" id="navbarSupportedContent-7">
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
								<div className="dropdown-menu bg-black" aria-labelledby="navbarDropdown">
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
