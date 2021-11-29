import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AllElementsListElement } from "./allElementsListElement";

export const AllElements = ({ elements_plural, elements_singular, img, add_route }) => {
	const { store, actions } = useContext(Context);
	const [elements, setElements] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [selectedElements, setSelectedElements] = useState([]);

	useEffect(() => {
		getElements();
	}, []);

	useEffect(
		() => {
			let regular_exp = new RegExp(`${searchInput}`);
			let temp = [];
			for (let i = 0; i < elements.length; i++) {
				let name =
					elements_singular === "plot" ? elements[i].title.toLowerCase() : elements[i].name.toLowerCase();
				if (regular_exp.test(name)) temp.push(elements[i]);
			}
			setSelectedElements(temp);
		},
		[searchInput]
	);

	const getElements = async () => {
		const data = await actions.getUserElements(`user/${elements_plural}`);
		setElements(data);
		setSelectedElements(data);
	};

	return (
		<div className="container p-2 p-md-5">
			<div className="row align-items-center">
				<div className="col-12 col-md-6">
					<div className="header-tit">
						My <span> {elements_plural} </span>
					</div>
					<div className="header-subtitle">
						<Link to={add_route}>
							<button className="btn-prin">Create new {elements_singular}</button>
						</Link>
					</div>
				</div>
				<div className="col-12 col-md-6 text-center">
					<img src={img} className="header-img" />
				</div>
			</div>

			<div className="row justify-content-center my-5">
				<div className="col-12 col-md-8">
					<input
						className="search-box"
						placeholder={`Search ${elements_singular}`}
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</div>
			</div>
			<div className="row m-auto justify-content-center mt-5">
				<div className="col-12 col-md-8 my-2">
					{selectedElements.map(element => (
						<AllElementsListElement route={`my${elements_plural}`} element={element} key={element.id} />
					))}
				</div>
			</div>
		</div>
	);
};

AllElements.propTypes = {
	elements_plural: PropTypes.string,
	elements_singular: PropTypes.string,
	img: PropTypes.string,
	add_route: PropTypes.string
};
