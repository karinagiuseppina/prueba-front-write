import React from "react";
import "../../styles/styles.scss";

export const EditProfile = () => {
	return (
		<div className="container">
			<h1>Edit Profile</h1>
			<label>username</label>
			<input type="text" />
			<br />
			<label>name</label>
			<input type="text" />
			<br />
			<label>email</label>
			<input type="email" />
			<br />
			<label>actual password</label>
			<input type="password" />
			<br />
			<label>new password</label>
			<input type="password" />
			<br />
			<label>verify new password</label>
			<input type="password" />
			<br />

			<button>Edit profile</button>
		</div>
	);
};
