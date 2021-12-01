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
				return user_session ? user_session["cookie"] : null;
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
					timer: 5500
				});
				Toast.fire({
					icon: icon,
					title: title
				});
			},
			getUserElements: async route => {
				const token = getActions().getUserToken();
				const resp = await fetch(`${process.env.BACKEND_URL}/api/${route}`, {
					method: "GET",
					headers: { "Content-Type": "application/json", Authorization: token }
				});
				if (resp.ok) {
					const data = await resp.json();
					return data;
				}
			},
			setModalSelection: async (element, elements) => {
				const { value: selection } = await Swal.fire({
					title: `Add new ${element}`,
					input: "select",
					inputOptions: elements,
					inputPlaceholder: `Select a ${element}`,
					showClass: {
						popup: "animate__animated animate__fadeInDown"
					},
					hideClass: {
						popup: "animate__animated animate__fadeOutUp"
					},
					customClass: {
						container: "container-add-modal",
						popup: "popup-add-modal"
					},
					showCancelButton: true,
					inputValidator: value => {
						return new Promise(resolve => {
							if (value) {
								return resolve();
							} else {
								return resolve(`Please, select a ${element}`);
							}
						});
					}
				});
				return selection;
			},
			addRelationshipBetweenElements: async (route, body) => {
				const token = getActions().getUserToken();
				const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/${route}`, {
					method: "POST",
					headers: { "Content-Type": "application/json", Authorization: token },
					body: JSON.stringify(body)
				});
				return resp;
			},
			deleteFetch: async route => {
				const token = getActions().getUserToken();
				const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${route}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json", Authorization: token }
				});
				return resp;
			},
			createElement: async (route, body) => {
				const token = getActions().getUserToken();
				const resp = await fetch(`${process.env.BACKEND_URL}/api/${route}`, {
					method: "POST",
					headers: { "Content-Type": "application/json", Authorization: token },
					body: JSON.stringify(body)
				});
				return resp;
			},
			deleteElementFromStateList: (set, elements, element_id) => {
				let index = elements.findIndex(e => e.id === element_id);
				let e = [...elements];
				e.splice(index, 1);
				set(e);
			},
			confirmDelete: (name, deleteElement) => {
				Swal.fire({
					title: `Do you want to delete ${name}?`,
					text: "You wont be able to get it back!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, delete please!"
				}).then(result => {
					if (result.isConfirmed) {
						deleteElement();
					}
				});
			}
		}
	};
};

export default getState;
