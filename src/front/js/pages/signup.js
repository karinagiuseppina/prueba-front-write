import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { useHistory } from "react-router-dom";
import { Formgroup } from "../component/formGroup";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	let history = useHistory();

	const signup = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu16.gitpod.io/api/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password, is_active: true })
		});

		if (!resp.ok) throw Error("There was a problem in the signup request");

		const data = await resp.json();
		history.push("/login");
	};

	return (
		<div className="view">
			<div className="mask rgba-gradient d-flex justify-content-center align-items-center tot-height">
				<div className="container">
					<h1>Sign Up</h1>
					<div className="row justify-content-center">
						<div className="col-12 col-md-10 col-lg-8 bg-black p-4 m-1 rounded">
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

							<button type="submit" className="btn btn-primary" onClick={signup}>
								SignUp
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
