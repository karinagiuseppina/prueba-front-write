const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user_id: null
		},
		actions: {
			getRandom: length => {
				return Math.floor(Math.random() * length);
			},
			setUserSession: (user, token) => {
				localStorage.setItem("token", JSON.stringify(token));
				setStore({ token: token });
				setStore("user_id", user);
				localStorage.setItem("user_id", JSON.stringify(user));
			},
			deleteUserSession: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				localStorage.removeItem("user_info");
				setStore({ user_info: null });
			},
			syncUserFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				const user_info = localStorage.getItem("user_info");

				if (token && token !== undefined && token !== "") {
					setStore({ token: token });
				}
				if (user_info && user_info !== undefined && user_info !== "") {
					setStore({ user_info: user_info });
				}
			}
		}
	};
};

export default getState;
