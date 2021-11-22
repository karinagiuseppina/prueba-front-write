import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export const EventComponent = ({event, position, delete_event}) => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	// async function handleUpdateEvent() {
	// 	const { value: formValues } = await Swal.fire({
    //         title: 'Multiple inputs',
    //         html:
    //           '<input id="swal-input1" class="swal2-input">' +
    //           '<input id="swal-input2" class="swal2-input">',
    //         focusConfirm: false,
    //         preConfirm: () => {
    //           return [
    //             document.getElementById('swal-input1').value,
    //             document.getElementById('swal-input2').value
    //           ]
    //         }
    //       })
          
    //       if (formValues) {
    //         Swal.fire(JSON.stringify(formValues))
    //       }

	// 	if (society) {
	// 		add_society_to_plot({ id: society, name: societies[society] });
	// 	}
	// }

	const delete_event = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/delete/plot/${plot_id}/event/${event.id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			actions.setToast("success", "Society deleted from plot!");
			delete_event(position);
		} else {
			actions.setToast("error", "There has been a problem!");
		}
	};

	return (
		<li>
											{event.title} <button onClick={delete_event}>X</button>
										</li>
	);
};
EventComponent.propTypes = {
	event: PropTypes.object, 
    position: PropTypes.number, 
    delete_event: PropTypes.func
};