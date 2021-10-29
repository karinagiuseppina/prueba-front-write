import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import PropTypes from "prop-types";

import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";

export const Sidebar = ({ toggled, collapsed, handleToggleSidebar, handleCollapsedChange }) => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const token = store.user && store.user !== undefined && store.user !== "" ? store.user["localId"] : null;

	const handleLogOut = () => {
		actions.deleteUserSession();
		history.push("/");
	};

	const logIn = (
		<>
			<MenuItem icon={<i className="fas fa-power-off" />}>
				Sign In <Link to="/login" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-sign-in-alt" />}>
				Sign Up <Link to="/register" />
			</MenuItem>
		</>
	);
	const logOut = (
		<>
			<MenuItem icon={<i className="fas fa-book-open" />}>
				Favorite Prompts <Link to="/favoriteprompts" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-bookmark" />}>
				Favorite Characters
				<Link to="/favoritecharacters" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-pen" />}>
				My Plots
				<Link to="/myplots" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-user-edit" />}>
				My Characters
				<Link to="/mycharacters" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-globe-africa" />}>
				My Societies
				<Link to="/mysocieties" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-user-cog" />}>
				Edite Profile
				<Link to="/editmyprofile" />
			</MenuItem>
			<MenuItem icon={<i className="fas fa-power-off" />} onClick={handleLogOut}>
				Log Out
			</MenuItem>
		</>
	);
	return (
		<ProSidebar collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
			<SidebarHeader>
				<Menu iconShape="circle">
					<MenuItem icon={<i className="fas fa-home" />}>
						Write Me In
						<Link to="/" />
					</MenuItem>
				</Menu>
			</SidebarHeader>
			<SidebarContent>
				<Menu iconShape="circle">
					<MenuItem icon={<i className="fas fa-lightbulb" />}>
						Discover Prompts <Link to="/discoverPrompts" />
					</MenuItem>
					<MenuItem icon={<i className="fas fa-user-check" />}>
						Discover Characters <Link to="/discoverCharacters" />
					</MenuItem>
					{token && token !== undefined && token !== "" ? logOut : logIn}
				</Menu>
			</SidebarContent>
			<SidebarFooter>
				<Menu iconShape="circle">
					<MenuItem
						onClick={() => handleCollapsedChange(!collapsed)}
						icon={<i className={collapsed ? "fas fa-chevron-right" : "fas fa-chevron-left"} />}>
						Collapse Menu
					</MenuItem>
				</Menu>
			</SidebarFooter>
		</ProSidebar>
	);
};

Sidebar.propTypes = {
	toggled: PropTypes.bool,
	collapsed: PropTypes.bool,
	breakPoint: PropTypes.string,
	handleToggleSidebar: PropTypes.func,
	handleCollapsedChange: PropTypes.func
};
