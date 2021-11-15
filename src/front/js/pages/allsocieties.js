import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import { SocietyCard } from "../component/societyCard";
import plots_img from "../../img/Prompts.png";

export const AllSocieties = () => {
	const { store, actions } = useContext(Context);
	const [societies, setSocieties] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [societiesSelected, setSocietiesSelected] = useState([]);

	useEffect(() => {
		getSocieties();
	}, []);

	useEffect(
		() => {
			let regular_exp = new RegExp(`${searchInput}`);
			let temp = [];
			for (let i = 0; i < societies.length; i++) {
				let name = societies[i].name.toLowerCase();
				if (regular_exp.test(name)) temp.push(societies[i]);
			}
			setSocietiesSelected(temp);
		},
		[searchInput]
	);

	const getSocieties = async () => {
		const data = await actions.getUserElements("user/societies");
		setSocieties(data);
		setSocietiesSelected(data);
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit">
						My <span> societies </span>
					</div>
					<div className="header-subtitle text-center">
						<Link to="/create-society">
							<button className="btn-prin">Create new society</button>
						</Link>
					</div>
				</div>
				<div className="col-12 col-md-6 text-center">
					<img src={plots_img} className="header-img" />
				</div>
			</div>

			<div className="row justify-content-center my-5">
				<div className="col-12 col-md-8">
					<input
						className="search-box"
						placeholder="Search plot"
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</div>
			</div>
			{/* <div className="row justify-content-end">
				<div className="col-12 col-md-4 align-self-end mt-5 mx-auto m-md-0">
					<Link to="/create-plot">
						<button className="btn-prin">Create new plot</button>
					</Link>
				</div>
			</div> */}
			<div className="row m-auto justify-content-center mt-5">
				<div className="col-12 col-md-8 my-2">
					{societiesSelected.map(society => (
						<SocietyCard society={society} key={society.id} />
					))}
				</div>
			</div>
		</div>
	);
};

{
	/* <div className="container-fluid m-0 bg-gradiente">
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
		</div> */
}
