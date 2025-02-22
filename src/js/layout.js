import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { Characters } from "./views/characters";
import { Planets } from "./views/planets";
import { Vehicles } from "./views/vehicles";
import { Starships } from "./views/starships";
import { Favorites } from "./views/favorites";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CharacterDetail } from "./component/characterDetail";
import { VehicleDetail } from "./component/vehicleDetail";
import { PlanetDetail } from "./component/planetDetail";
import { StarshipDetail } from "./component/starshipDetail";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="app-container">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/characters" element={<Characters />} />
						<Route path="/planets" element={<Planets />} />
						<Route path="/vehicles" element={<Vehicles />} />
						<Route path="/starships" element={<Starships />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/characters/:uid" element={<CharacterDetail />} />
						<Route path="/vehicles/:uid" element={<VehicleDetail />} />
						<Route path="/planets/:uid" element={<PlanetDetail />} />
						<Route path="/starships/:uid" element={<StarshipDetail/>}/>
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
