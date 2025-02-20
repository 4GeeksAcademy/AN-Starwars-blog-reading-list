import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';


export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogoClick = () => {
		if (location.pathname !== "/") {
			navigate("/");
		} else {
			window.location.reload();
		}
	};

	return (
		<div className="d-flex NAV flex-column align-items-center">
			<div className='d-flex justify-content-center mt-4'>
				<Link to="/" onClick={handleLogoClick}>
					<img
						className="navbar-logo animate__animated animate__zoomIn"
						src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
						alt="logo"
					/>
				</Link>
			</div>
			<nav className="navbar navbar-expand ">
				<button className="navbar-toggler text-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="text-center my-4 animate__animated animate__zoomIn collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<NavLink
							to="/characters"
							className={({ isActive }) =>
								`navlink text-decoration-none mx-3 ${isActive ? "active-link" : ""}`
							}
						>
							<strong>CHARACTERS</strong>
						</NavLink>

						<NavLink
							to="/planets"
							className={({ isActive }) =>
								`navlink text-decoration-none mx-3 ${isActive ? "active-link" : ""}`
							}
						>
							<strong>PLANETS</strong>
						</NavLink>
						<NavLink
							to="/vehicles"
							className={({ isActive }) =>
								`navlink text-decoration-none mx-3 ${isActive ? "active-link" : ""}`
							}
						>
							<strong>VEHICLES</strong>
						</NavLink>

						<NavLink
							to="/favorites"
							className={({ isActive }) =>
								`navlink text-decoration-none mx-3 ${isActive ? "active-link" : ""}`
							}
						>
							<strong>FAVORITES</strong>
						</NavLink>
					</ul>
				</div>
			</nav>
			<hr className="navbar-divider" />

		</div>
	);
};
