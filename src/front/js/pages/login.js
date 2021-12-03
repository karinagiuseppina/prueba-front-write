import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
	const { actions } = useContext(Context);
	const [user, setUser] = useState({ email: "", password: "" });
	const [vissiblePasswordType, setVissiblePasswordType] = useState("password");
	const [isVisiblePassword, setIsVissiblePassword] = useState(false);
	let history = useHistory();

	const handleLogin = async () => {
		let response = await actions.login(user.email, user.password);
		if (response.code === 400) {
			actions.setToast("warning", response.msg);
		} else {
			actions.setToast("success", response.msg);
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

	const updateValue = (attr, value) => {
		let old_value = { ...user };
		old_value[attr] = value;
		setUser(old_value);
	};

	const handleResetPassword = async () => {
		const { value: email } = await Swal.fire({
			title: "Input email address",
			input: "email",
			inputLabel: "Your email address",
			inputPlaceholder: "Enter your email address"
		});

		if (email) {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/reset-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email })
			});
			if (resp.ok) {
				actions.setToast("success", "Check your email!");
			} else {
				actions.setToast("warning", "Email doesn't exist");
			}
		}
	};
	return (
		<div className="container">
			<div className="row align-items-center">
				<div className="col-12 col-md-8 mx-auto">
					<div className="login-card">
						<div className="card-img-left d-none d-md-flex" />
						<div className="card-body p-5">
							<h1 className="header-tit py-1 py-md-4">Sign In</h1>
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
								<button className="btn-prin" onClick={handleLogin}>
									Sign in
								</button>
							</div>
							<div className="d-block text-center small">
								Forgot your password?
								<Link onClick={handleResetPassword} className="mx-2 mt-2 text-decoration-none">
									Reset Password
								</Link>
							</div>

							<div className="d-block text-center small">
								{`You don't have an account?`}
								<Link className="mx-2 mt-2 text-decoration-none" to="/register">
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
