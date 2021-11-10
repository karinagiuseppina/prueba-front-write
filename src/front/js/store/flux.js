import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user_session: null,
			genres: ["fantasy", "sci-fi", "dystopian", "contemporary", "romance", "thriller", "mystery"],
			genders: ["female", "male"]
		},
		actions: {
			getRandom: length => {
				return Math.floor(Math.random() * length);
			},
			setUserSession: cookie => {
				setStore({ user_session: cookie });
				localStorage.setItem("user_session", JSON.stringify(cookie));
			},
			deleteUserSession: () => {
				localStorage.removeItem("user_session");
				setStore({ user_session: null });
			},
			syncUserFromLocalStorage: () => {
				const user = JSON.parse(localStorage.getItem("user_session"));

				if (user && user !== undefined && user !== "") {
					setStore({ user_session: user });
				}
			},
			getUserToken: () => {
				let user_session = getStore().user_session;
				if (user_session === null) {
					getActions().syncUserFromLocalStorage;
					user_session = JSON.parse(localStorage.getItem("user_session"));
				}
				return user_session["cookie"];
			},
			login: async (email, password) => {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
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
