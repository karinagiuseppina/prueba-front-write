import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SignupModal } from "../pages/signupModal";
import { LoginModal } from "../pages/loginModal";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import PropTypes from "prop-types";

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";

export const Sidebar = ({ toggled, collapsed, handleToggleSidebar, handleCollapsedChange }) => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const token = store.user && store.user !== undefined && store.user !== "" ? store.user["localId"] : null;

	const handleLogOut = () => {
		actions.deleteUserSession();
		history.push("/");
	};
	const handleSignIn = () => {
		<LoginModal />;
	};
	const handleSignUp = () => {
		<SignupModal />;
	};

	const logIn = (
		<>
			<MenuItem icon={<i className="fas fa-adjust" />} onClick={handleSignIn}>
				Sign In
			</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />} onClick={handleSignUp}>
				Discover Characters
			</MenuItem>
		</>
	);
	const logOut = (
		<>
			<MenuItem icon={<i className="fas fa-adjust" />}>Favorite Prompts</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />}>Favorite Characters</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />}>My Plots</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />}>My Characters</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />}>Edite Profile</MenuItem>
			<MenuItem icon={<i className="fas fa-adjust" />} onClick={handleLogOut}>
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
					<MenuItem icon={<i className="fas fa-adjust" />}>
						Discover Prompts <Link to="/discoverPrompts" />
					</MenuItem>
					<MenuItem icon={<i className="fas fa-adjust" />}>
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
