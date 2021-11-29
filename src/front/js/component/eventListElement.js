import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EventListElement = ({ event, events, setEvents, plot_id }) => {
	const { actions } = useContext(Context);
	const delete_event = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/delete/plots/${plot_id}/event/${event.id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			actions.setToast("success", "Event deleted!");
			actions.deleteElementFromStateList(setEvents, events, event.id);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};
	return (
		<li className="timeline-item">
			<div className="timeline-arrow" />
			<div className="timeline-info">
				<div className="flex-grow-1">
					<h3>{event.title}</h3>
					<span>
						<i className="fa fa-clock-o mr-1" />
						{event.date}
					</span>
					<p>{event.description}</p>
				</div>
				<button onClick={delete_event} className="align-self-start">
					<i className="fas fa-times" />
				</button>
			</div>
		</li>
	);
};

EventListElement.propTypes = {
	event: PropTypes.object,
	plot_id: PropTypes.string,
	setEvents: PropTypes.func,
	events: PropTypes.array
};
