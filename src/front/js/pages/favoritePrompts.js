import React from "react";
import "../../styles/styles.scss";

export const FavoritePrompts = () => {
	return (
		<div className="container">
			<h1>Favorite Prompts</h1>
			<div className="d-flex flex-wrap justify-content-center">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Genre</h5>
						<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
						<p className="card-text">prompt aquí.</p>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Genre</h5>
						<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
						<p className="card-text">prompt aquí.</p>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Genre</h5>
						<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
						<p className="card-text">prompt aquí.</p>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Genre</h5>
						<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
						<p className="card-text">prompt aquí.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
