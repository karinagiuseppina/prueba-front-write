import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { PromptModal } from "./promptModal";

export const Protected = () => {
	const { store } = useContext(Context);

	const getProtected = async () => {
		let token = JSON.parse(localStorage.getItem("user"));
		token = token["idToken"];
		const resp = await fetch(`${process.env.BACKEND_URL}/api/protectedCookie`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const data = await resp.json();
			console.log(data.msg);
		}
	};
	useEffect(() => {
		getProtected();
	}, []);

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-12 col-xl-11 mx-auto p-4">
					<div className="row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="col-12 col-md-6 discover-prompt-image d-flex align-items-center justify-content-center">
							<h1 className="card-title text-uppercase fs-1 text-white">protected</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
