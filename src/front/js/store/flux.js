const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null
		},
		actions: {
			getRandom: length => {
				return Math.floor(Math.random() * length);
			},
			setUserSession: user => {
				console.log(typeof user, user);
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
			}
		}
	};
};

export default getState;
