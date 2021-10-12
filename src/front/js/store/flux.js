import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			genres: ["fantasy", "sci-fi", "dystopian", "contemporary", "romance", "thriller", "mystery"],
			genders: ["female", "male"]
		},
		actions: {
			getRandom: length => {
				return Math.floor(Math.random() * length);
			},
			setUserSession: user => {
				setStore({ user: user });
				localStorage.setItem("user", JSON.stringify(user));
			},
			deleteUserSession: () => {
				localStorage.removeItem("user");
				setStore({ user: null });
			},
			syncUserFromLocalStorage: () => {
				const user = JSON.parse(localStorage.getItem("user"));

				if (user && user !== undefined && user !== "") {
					setStore({ user: user });
				}
			},
			login: async (email, password) => {
				const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				});
				const data = await resp.json();

				if (data.error) {
					return { code: 400, msg: "Sorry, invalid email/password" };
				} else {
					getActions().setUserSession(data);
					return { code: 200, msg: `Welcome back,${data.displayName}!` };
				}
			},
			setToast: (icon, title) => {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 1500
				});
				Toast.fire({
					icon: icon,
					title: title
				});
			}
		}
	};
};

export default getState;
