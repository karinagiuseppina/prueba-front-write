import React, { useContext } from "react";
import { Context } from "../store/appContext";
import maquina from "../../img/Maquina.png";
import plots from "../../img/Prompts.png";
import discover_characters from "../../img/discover_characters.png";
import discover_prompts from "../../img/discover_prompts.png";
import my_characters from "../../img/my-characters.png";
import { Link } from "react-router-dom";

export const Home = () => {
	const { actions } = useContext(Context);
	return (
		<div className="container-fluid p-0">
			<div className="container px-2 px-md-5">
				<div className="row align-items-center h-tot">
					<div className="col-12 col-md-6">
						<div className="header-tit">
							One plot, <br />
							<span>infinite stories </span>
						</div>
						<div className="header-subtitle">
							Welcome to Write Me In, little stranger! We hope you are ready to find your inner writer and
							let your creativity run wild, the world wants to read what you have to write and we wante to
							help you.
						</div>
					</div>
					<div className="col-12 col-md-6 text-center">
						<img src={maquina} className="header-img" />
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div className="beige-box">
						<img src={discover_prompts} className="service-img" />
						<div className="service-info">
							<h3>Discover prompts </h3>
							Discover Prompts allows you to select a gender and discover new prompt ideas related to that
							gender. A prompt means to give a cue to you, in order to help you focus on a specific topic,
							task, or purpose. In this way, writing prompts are a type of assessment or activity that
							directs individuals to write about a given topic in a certain way.
							<Link to="/discoverPrompts" className="mx-auto mt-5">
								<button className="btn-prin">Discover Prompts</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-12">
					<div className="white-box">
						<img src={discover_characters} className="service-img" />
						<div className="service-info">
							<h3>Discover Characters </h3>
							Discover characters allows you to generate a random character in order to get inspired for
							your main or secondary characters. Get a hint of their personality, their age, name and
							surname. If you like it, you can add it to your favorites and customize it to make it yours.
							<Link to="/discoverCharacters" className="mx-auto mt-5">
								<button className="btn-prin">Discover Characters</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div className="beige-box">
						<img src={plots} className="service-img" />
						<div className="service-info">
							<h3>Define your Plots </h3>
							Create your own plots to begin the planning of your next novel, Write Me In allows you to
							have your synopsys, main events, characters and societies in the same page. Keep your books
							consistent and your readers happy.
							<Link
								to={actions.getUserToken() === null ? "/logIn" : "/createprompt"}
								className="mx-auto mt-5">
								<button className="btn-prin">Create plot</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-12">
					<div className="white-box">
						<img src={my_characters} className="service-img" />
						<div className="service-info">
							<h3>Design your characters </h3>
							Design your custom characters in order to resume their personality, background and physical
							appearence. This will save you time in the future, in order to keep your character details
							gathered in a single space.
							<Link
								to={actions.getUserToken() === null ? "/logIn" : "/createcharacter"}
								className="mx-auto mt-5">
								<button className="btn-prin">Design character</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
