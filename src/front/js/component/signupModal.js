import React, { useState, useContext } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { Formgroup } from "../component/formGroup";
import { useHistory } from "react-router-dom";

export const SignupModal = () => {
	const { store, actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [message, setMessage] = useState("");
	let history = useHistory();

	const signup = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name, username: username, email: email, password: password })
		});
		if (!resp.ok) setMessage("Something went wrong with the Sign up request!");
		else {
			const data = await resp.json();
			console.log(data);
			emptyFields();
			hideModal();
			history.push("/");
		}
	};
	const emptyFields = () => {
		setEmail("");
		setName("");
		setUsername("");
		setPassword("");
	};
	const showModal = () => {
		setModal(true);
	};

	const hideModal = () => {
		setModal(false);
	};
	return (
		<div>
			<div className={Modal ? "modal display-block" : "modal display-none"}>
				<section className="modal-main">
					<div className="bg-prin d-flex justify-content-stretch p-4 align-items-center">
						<h5 className="text-white font-prin flex-grow-1 p-0">Sign Up </h5>
						<button type="button" onClick={hideModal} className="btn">
							<i className="fas fa-times text-white" />
						</button>
					</div>
					<div className="p-4 bg-white d-flex flex-column justify-content-stretch align-items-center">
						<div className="text-dark">{message}</div>
						<Formgroup
							id="inputUsername"
							name="Username"
							type="text"
							placeholder="Enter your username here."
							set={setUsername}
							value={username}
						/>
						<Formgroup
							id="inputName"
							name="Name"
							type="text"
							placeholder="Enter your name here."
							set={setName}
							value={name}
						/>
						<Formgroup
							id="inputEmail"
							name="Email"
							type="email"
							placeholder="Enter your email here."
							set={setEmail}
							value={email}
						/>
						<Formgroup
							id="inputPassword"
							name="Password"
							type="password"
							placeholder="Enter your password here."
							set={setPassword}
							value={password}
						/>

						<button type="submit" className="btn bg-prin text-white rounded py-2 px-4" onClick={signup}>
							SignUp
						</button>
					</div>
				</section>
			</div>
			<button type="button" onClick={showModal} className="btn bg-prin text-white rounded p-2">
				Sign Up
			</button>
		</div>
	);
};
