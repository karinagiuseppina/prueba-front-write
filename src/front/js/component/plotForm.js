import React from "react";
import PropTypes from "prop-types";
import { NormalInput } from "../component/normalInput";
import { TextareaInput } from "../component/textareaInput";

export const PlotForm = ({ plot, setPlot, saveFunction }) => {
	const updateValue = (attr, value) => {
		let old_value = { ...plot };
		old_value[attr] = value;
		setPlot(old_value);
	};
	return (
		<div className="container p-2 p-md-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8">
					<NormalInput type="text" id="title" placeholder="Title" set={updateValue} value={plot.title} />
					<NormalInput type="text" id="genre" placeholder="Genre" set={updateValue} value={plot.genre} />
					<TextareaInput id="synopsis" placeholder="Synopsis" set={updateValue} value={plot.synopsis} />
				</div>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-md-8 text-center">
					<button onClick={saveFunction} className="btn-prin">
						Save Plot
					</button>
				</div>
			</div>
		</div>
	);
};
PlotForm.propTypes = {
	plot: PropTypes.object,
	setPlot: PropTypes.func,
	saveFunction: PropTypes.func
};
