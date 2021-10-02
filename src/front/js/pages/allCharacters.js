import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";

export const AllCharacters = () => {
	return (
		<div className="container">
			<h1>My characters</h1>

			<button>Create new character</button>
			<div className="d-flex flex-wrap justify-content-center">
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Jane Doe</h5>
						<h6 className="card-subtitle mb-2 text-muted">32 years - Lawyer</h6>
						<p className="card-text">Harry Potter, Narnia, etc</p>
						<Link to="/mycharacters/1"> View more</Link>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Jane Doe</h5>
						<h6 className="card-subtitle mb-2 text-muted">32 years - Lawyer</h6>
						<p className="card-text">Harry Potter, Narnia, etc</p>
						<button> View more</button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Jane Doe</h5>
						<h6 className="card-subtitle mb-2 text-muted">32 years - Lawyer</h6>
						<p className="card-text">Harry Potter, Narnia, etc</p>
						<button> View more</button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Jane Doe</h5>
						<h6 className="card-subtitle mb-2 text-muted">32 years - Lawyer</h6>
						<p className="card-text">Harry Potter, Narnia, etc</p>
						<button> View more</button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Jane Doe</h5>
						<h6 className="card-subtitle mb-2 text-muted">32 years - Lawyer</h6>
						<p className="card-text">Harry Potter, Narnia, etc</p>
						<button> View more</button>
					</div>
				</div>
			</div>
		</div>
	);
};
