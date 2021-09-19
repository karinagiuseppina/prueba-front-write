const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user_info: null
		},
		actions: {
			getRandom: length => {
				return Math.floor(Math.random() * length);
			},
			setToken: token => {
				localStorage.setItem("token", JSON.stringify(token));
				setStore({ token: token });
			},
			deleteToken: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			},
			setUser_info: user => {
				setStore("user_info", user);
			}
		}
	};
};

export default getState;
