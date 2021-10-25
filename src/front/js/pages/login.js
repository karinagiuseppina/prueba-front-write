import React, { useState, useContext } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { Formgroup } from "../component/formGroup";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
	const { actions } = useContext(Context);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [vissiblePasswordType, setVissiblePasswordType] = useState("password");
	const [isVisiblePassword, setIsVissiblePassword] = useState(false);
	let history = useHistory();

	const handleLogin = async () => {
		let response = await actions.login(email, password);
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

	return (
		<div className="container-fluid m-0 bg-gradiente">
			<div className="row tot-height align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-img-left d-none d-md-flex" />
						<div className="card-body p-4 p-sm-5">
							<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin font-sec">
								Sign In
							</h1>

							<Formgroup
								type="email"
								id="email"
								placeholder="Email Address"
								name="Email Address"
								set={setEmail}
								value={email}
							/>
							<Formgroup
								type={vissiblePasswordType}
								id="password"
								placeholder="Password"
								name="Password"
								set={setPassword}
								value={password}
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
									onClick={handleLogin}>
									Log In
								</button>
							</div>
							<div className=" d-block text-center small">
								You do not have an account?
								<Link className="mx-2 mt-2 text-prin text-decoration-none" to="/register">
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
