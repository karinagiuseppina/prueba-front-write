import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";

export const EditProfile = () => {
	const { actions } = useContext(Context);
	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const [oldPassword, setOldPassword] = useState("");
	const [vissiblePasswordType, setVissiblePasswordType] = useState("password");
	const [isVisiblePassword, setIsVissiblePassword] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getUserInfo();
	}, []);
	const getUserInfo = async () => {
		let data = await actions.getUserElements("user/info");
		setUser({ name: data["name"], email: data["email"], password: "" });
	};

	const updateValue = (attr, value) => {
		let old_value = { ...user };
		old_value[attr] = value;
		setUser(old_value);
	};

	const handleUpdateUserData = () => {
		if (user["password"].length > 0 && user["password"].length < 5) {
			setMessage(<div className="alert alert-warning">Password must be at least 6 caracters long.</div>);
		} else updateProfile();
	};

	const updateProfile = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/edit-profile`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ user: user, current_password: oldPassword })
		});
		if (resp.ok) {
			refreshLogin();
		} else {
			setMessage(<div className="alert alert-warning">{resp.msg}</div>);
		}
	};
	const refreshLogin = async () => {
		let password = user["password"].length > 0 ? user["password"] : oldPassword;
		let msg = await actions.login(user["email"], password);
		actions.setToast("success", "Profile updated!");
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
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<div className="header-tit detailed-header text-center">Edit my profile</div>
				</div>
			</div>
			<div className="container p-2 p-md-5">
				<div className="row justify-content-center align-items-center">
					<div className="col-12 col-md-8">
						{message}
						<label htmlFor="old-password">Confirm your password to make any changes</label>
						<input
							type="password"
							className="form-control border-0 border-bottom"
							id="old-password"
							onChange={e => setOldPassword(e.target.value)}
							value={oldPassword}
						/>
						<NormalInput type="text" id="name" placeholder="name" set={updateValue} value={user.name} />
						<NormalInput type="text" id="email" placeholder="email" set={updateValue} value={user.email} />
						<NormalInput
							type={vissiblePasswordType}
							id="password"
							placeholder="new password"
							set={updateValue}
							value={user.password}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								onChange={handleVissibleInput}
								id="passwordVissible"
								checked={isVisiblePassword}
							/>
							<label className="form-check-label text-muted small mt-0 mb-2" htmlFor="passwordVissible">
								Visible password
							</label>
						</div>
					</div>
				</div>

				<div className="row justify-content-center align-items-center">
					<div className="col-12 col-md-8 text-center">
						<button onClick={handleUpdateUserData} className="btn-prin">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
