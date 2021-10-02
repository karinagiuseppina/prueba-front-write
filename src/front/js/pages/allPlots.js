import React from "react";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";

export const AllPlots = () => {
	return (
		<div className="container">
			<h1>My plots</h1>
			<button>Create new plot</button>
			<div className="d-flex flex-wrap justify-content-center">
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<Link to="/myplots/1"> View more </Link>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<button> View more </button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<button> View more </button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<button> View more </button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<button> View more </button>
					</div>
				</div>
				<div className="card w-25 m-2">
					<div className="card-body">
						<h5 className="card-title">Title</h5>
						<h6 className="card-subtitle mb-2 text-muted">Genre</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
						</p>
						<button> View more </button>
					</div>
				</div>
			</div>
		</div>
	);
};
