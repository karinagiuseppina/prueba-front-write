import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { SocietyCard } from "../component/societyCard";

export const AllSocieties = () => {
	const { store, actions } = useContext(Context);
	const [societies, setSocieties] = useState([]);

	useEffect(() => {
		getSocieties();
	}, []);

	const getSocieties = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/societies`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const data = await resp.json();
			setSocieties(data);
		}
	};

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">My Societies</h1>
							<div className="d-flex my-3 justify-content-end">
								<button className="btn btn-prin fw-bold text-uppercase w-25 p-2">
									<Link to="/create-society" className="text-decoration-none text-white">
										Create Society
									</Link>
								</button>
							</div>
							{societies.map(society => (
								<SocietyCard society={society} key={society.id} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
