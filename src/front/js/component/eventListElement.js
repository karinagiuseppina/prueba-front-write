import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const EventListElement = ({ event, deleteEvent, plot_id }) => {
	const { store, actions } = useContext(Context);
	const delete_event = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/delete/plots/${plot_id}/event/${event.id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			actions.setToast("success", "Event deleted!");
			deleteEvent(event.id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	return (
		<li className="timeline-item bg-white rounded ml-3 p-4 shadow">
			<div className="timeline-arrow" />
			<h2 className="h5 mb-0">{event.title}</h2>
			<span className="small text-gray">
				<i className="fa fa-clock-o mr-1" />
				{event.date}
			</span>
			<p className="text-small mt-2 font-weight-light">{event.description}</p>
			<button onClick={delete_event}>x</button>
		</li>
	);
};

EventListElement.propTypes = {
	event: PropTypes.object,
	plot_id: PropTypes.string,
	deleteEvent: PropTypes.func
};
