import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavbarItems = ({ items, columns, title }) => {
	return (
		<div className="menu-item">
			<div className="menu-text">{title}</div>
			<div className={`sub-menu ${columns}`}>
				{items.map(item => {
					return (
						<div className="icon-box" key={item.title}>
							<Link to={item.link}>
								<div className="icon">
									<i className={item.icon} />
								</div>
								<div className="text">
									<div className="title">{item.title}</div>
									<div className="sub-text">{item.sub}</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

NavbarItems.propTypes = {
	items: PropTypes.array,
	columns: PropTypes.string,
	title: PropTypes.string
};
