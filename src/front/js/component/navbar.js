import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<img src={rigoImageUrl} alt="" width="30" height="24" className="d-inline-block align-text-top" />
					WriteMeIn
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/prompts">
								Prompts
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" href="/characters">
								Characters
							</Link>
						</li>
						<li>
							<div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
								<ul className="navbar-nav">
									<li className="nav-item dropdown">
										<a
											className="nav-link dropdown-toggle"
											href="#"
											id="navbarDarkDropdownMenuLink"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false">
											Dropdown
										</a>
										<ul
											className="dropdown-menu dropdown-menu-dark"
											aria-labelledby="navbarDarkDropdownMenuLink">
											<li>
												<a className="dropdown-item" href="#">
													Action
												</a>
											</li>
											<li>
												<a className="dropdown-item" href="#">
													Another action
												</a>
											</li>
											<li>
												<a className="dropdown-item" href="#">
													Something else here
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
