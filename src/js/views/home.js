import React from "react";
import { Link } from "react-router-dom";

export const Home = () => (
	<div>
	<h1>Welcome to Star Wars API</h1>
	<nav>
	  <ul>
		<li><Link to="/characters">Characters</Link></li>
		<li><Link to="/vehicles">Vehicles</Link></li>
		<li><Link to="/planets">Planets</Link></li>
		<li><Link to="/favorites">Favorites</Link></li>
	  </ul>
	</nav>
  </div>
);
