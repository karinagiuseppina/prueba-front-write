import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<div className="container-fluid p-0">
			<div className="container px-2 px-md-5">
				<div className="row align-items-center h-tot justify-content-center">
					<div className="col-12 col-md-6">
						<div className="header-tit text-center">
							Ups! <br />
							<span>Page not found </span>
						</div>
						<div className="header-subtitle text-center">
							<Link to="/">
								<button className="btn-prin">Back to home</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
