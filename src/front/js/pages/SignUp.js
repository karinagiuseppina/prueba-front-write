import React, { useState, useContext } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { Formgroup } from "../component/formGroup";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { PasswordInput } from "../component/passwordInput";

export const SignUp = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [vissiblePasswordType, setVissiblePasswordType] = useState("password");
	const [visiblePasswordIcon, setVissiblePasswordIcon] = useState("fas fa-eye-slash");
	const [message, setMessage] = useState("");
	let history = useHistory();

	const handleSignUp = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name, email: email, password: password })
		});
		const data = await resp.json();
		console.log(data);

		if (!data.ok) alert("Sorry, invalid email/password");
		else {
			let msg = await actions.login(email, password);
			console.log(msg);
			history.push("/");
		}
	};

	const handleVissibleInput = () => {
		if (vissiblePasswordType === "password") {
			setVissiblePasswordType("text");
			setVissiblePasswordIcon("fas fa-eye");
		} else {
			setVissiblePasswordType("password");
			setVissiblePasswordIcon("fas fa-eye-slash");
		}
	};

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-img-left d-none d-md-flex" />
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">Sign Up</h1>

							<Formgroup
								type="text"
								id="name"
								placeholder="Name"
								name="Name"
								set={setName}
								value={name}
							/>

							<Formgroup
								type="email"
								id="email"
								placeholder="Email Address"
								name="Email Address"
								set={setEmail}
								value={email}
							/>

							<PasswordInput
								type={vissiblePasswordType}
								id="password"
								name="Password"
								placeholder="Password"
								handleVissibility={handleVissibleInput}
								value={password}
								set={setPassword}
								icon={visiblePasswordIcon}
							/>

							<div className="d-flex mb-2 justify-content-center">
								<button
									className="btn btn-prin fw-bold text-uppercase w-100 w-md-25 p-2"
									onClick={handleSignUp}>
									Register
								</button>
							</div>
							<div className=" d-block text-center small">
								You have an account?
								<Link className="mx-2 mt-2 text-prin text-decoration-none" to="/login">
									Sign In
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
