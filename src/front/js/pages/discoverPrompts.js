import React, { useContext } from "react";
import "../../styles/styles.scss";
import { PromptModal } from "../component/promptModal";

export const DiscoverPrompts = () => {
	let prompts = [
		{
			genre: "fantasy",
			prompt:
				"Write about a character who finds an odd-looking egg in the forest. When they take it home, they never could have predicted what was inside it."
		},
		{
			genre: "fantasy",
			prompt:
				"Write a book about a character who has always had the ability to change how they looked, and so they hid their true appearance behind attractive façades. Now, their abilities aren’t working, exposing what they truly look like."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a story about once peaceful water dwellers who have suddenly declared war on a settlement that was its only true ally. Your character has no idea why and is thrust into the war against their will."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write about a character who wakes up in a space pod alone…next to a ship so massive it’s actually carrying a planet beneath it. Your character has no memory from before they wake."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a story about a character who lives in a world where every single person’s DNA is carefully genetically designed for something to help the community. Your main character despises what they were created for. This has never happened before."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write about how your character lives on a planet other than Earth. In fact, they don’t even know Earth exists. Well, they didn’t until some sort of advanced, technical probe crash-landed in their settlement, exposing the fact that they’re not alone. Now they have to decide what’s best for their settlement."
		},
		{
			genre: "sci-fi",
			prompt:
				"Write a book about how the world used to be plagued with war and famine and inhumanity. But after years and years of developing a technical system that is the center of and controls everything, it’s almost completely peaceful. Your character is the engineer keeping the system running and when they uncover how it works, they contemplate abandoning everything they know."
		},
		{
			genre: "science fiction",
			prompt: "ciencia 1"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 2"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 3"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 4"
		},
		{
			genre: "science fiction",
			prompt: "ciencia 5"
		},
		{
			genre: "dystopian",
			prompt: "disto 1"
		},
		{
			genre: "dystopian",
			prompt: "disto 2"
		},
		{
			genre: "dystopian",
			prompt: "disto 3"
		},
		{
			genre: "dystopian",
			prompt: "disto 4"
		},
		{
			genre: "contemporary",
			prompt: "cont 1"
		},
		{
			genre: "contemporary",
			prompt: "cont 2"
		},
		{
			genre: "contemporary",
			prompt: "cont 3"
		},
		{
			genre: "contemporary",
			prompt: "cont 4"
		},
		{
			genre: "romance",
			prompt: "rom 4"
		},
		{
			genre: "romance",
			prompt: "rom 3"
		},
		{
			genre: "romance",
			prompt: "rom 2"
		},
		{
			genre: "romance",
			prompt: "rom 41"
		},
		{
			genre: "thriller",
			prompt: "thri 4"
		},
		{
			genre: "thriller",
			prompt: "thri 41"
		},
		{
			genre: "thriller",
			prompt: "thri 42"
		},
		{
			genre: "thriller",
			prompt: "thri 43"
		},
		{
			genre: "mystery",
			prompt: "mist 4"
		},
		{
			genre: "mystery",
			prompt: "mist 3"
		},
		{
			genre: "mystery",
			prompt: "mist 2"
		},
		{
			genre: "mystery",
			prompt: "mist 1"
		}
	];

	return (
		<div className="container-fluid text-center mt-5 p-4 tot-height d-flex flex-column justify-content-center">
			<div className="row">
				<div className="col">
					<h1>Writing Prompts</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-8 m-auto">
					<div className="input-group mb-3">
						<label
							className="input-group-text bg-dark text-secondary rounded-0 border-secondary mx-1"
							htmlFor="inputGroupSelect01">
							Choose Genre
						</label>
						<select
							className="form-select flex-grow-1 bg-dark border border-secondary text-secondary"
							id="inputGroupSelect01">
							<option selected>Choose...</option>
							<option value="1">Fantasy</option>
							<option value="2">Sci-fi</option>
							<option value="3">Dystopian</option>
							<option value="4">Contemporary</option>
							<option value="5">Romance</option>
							<option value="6">Thriller</option>
							<option value="7">Mystery</option>
						</select>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-8 m-auto">
					<PromptModal />
				</div>
			</div>
		</div>
	);
};
