import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const SignUp = () => {
	const { actions } = useContext(Context);
	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const [vissiblePasswordType, setVissiblePasswordType] = useState("password");
	const [isVisiblePassword, setIsVissiblePassword] = useState(false);
	let history = useHistory();

	const updateValue = (attr, value) => {
		let old_value = { ...user };
		old_value[attr] = value;
		setUser(old_value);
	};

	const handleSignUp = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		});
		const data = await resp.json();

		if (!data.ok) actions.setToast("warning", "There has been a mistake during sign up.");
		else {
			let msg = await actions.login(email, password);
			history.push("/");
		}
	};

	const handleVissibleInput = () => {
		if (vissiblePasswordType === "password") {
			setVissiblePasswordType("text");
			setIsVissiblePassword(true);
		} else {
			setVissiblePasswordType("password");
			setIsVissiblePassword(false);
		}
	};

	return (
		<div className="container">
			<div className="row align-items-center">
				<div className="col-12 col-md-8 mx-auto">
					<div className="login-card">
						<div className="card-img-left d-none d-md-flex" />
						<div className="card-body p-5">
							<h1 className="header-tit py-4">Sign Up</h1>
							<NormalInput type="text" id="name" placeholder="name" set={updateValue} value={user.name} />
							<NormalInput
								type="text"
								id="email"
								placeholder="email"
								set={updateValue}
								value={user.email}
							/>
							<NormalInput
								type={vissiblePasswordType}
								id="password"
								placeholder="password"
								set={updateValue}
								value={user.password}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									onClick={handleVissibleInput}
									id="passwordVissible"
									checked={isVisiblePassword}
								/>
								<label
									className="form-check-label text-muted small mt-0 mb-2"
									htmlFor="passwordVissible">
									Visible password
								</label>
							</div>

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
