import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { TextareaInput } from "../component/textareaInput";
import { NormalInput } from "../component/normalInput";

export const AddEventButton = ({ plot_id, getEvents }) => {
	const { actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [event, setEvent] = useState({ date: "", title: "", description: "" });

	const updateValue = (attr, value) => {
		let old_value = { ...event };
		old_value[attr] = value;
		setEvent(old_value);
	};

	const showModal = () => {
		setModal(true);
	};

	const hideModal = () => {
		setModal(false);
	};

	const add_event_to_plot = async event => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/add/plot/${plot_id}/event`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ event: event })
		});
		if (resp.ok) {
			const event_id = await resp.json();
			event["id"] = event_id.id;
			actions.setToast("success", "Event added to plot!");
			getEvents();
			hideModal();
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<div>
			<div className={Modal ? "modal d-flex" : "modal display-none"}>
				<section className={`modal-main bg-white text-start animate__animated animate__backInLeft`}>
					<div className="modal-wmi-header">
						<button type="button" onClick={hideModal} className="btn text-white align-self-end">
							<i className="fas fa-times" />
						</button>
						<h3>New event </h3>
					</div>
					<p>
						<NormalInput type="text" id="title" placeholder="Title" set={updateValue} value={event.title} />
						<NormalInput type="date" id="date" placeholder="Date" set={updateValue} value={event.date} />
						<TextareaInput
							id="description"
							placeholder="Description"
							set={updateValue}
							value={event.description}
						/>
					</p>
					<button className="btn-prin mb-4" onClick={() => add_event_to_plot(event)}>
						Save
					</button>
				</section>
			</div>

			<button className="btn-prin" onClick={showModal}>
				<i className="fas fa-plus-circle" /> Add event
			</button>
		</div>
	);
};

AddEventButton.propTypes = {
	plot_id: PropTypes.string,
	setEvents: PropTypes.func,
	getEvents: PropTypes.func,
	events: PropTypes.object
};
