import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import death_star from "../../img/death_star.png";
import starWarsTheme from "../../audio/StarWarsMainTheme.mp3";

export const Home = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Mostrar el texto después de 3 segundos y reproducir la música de Star Wars
    const timer = setTimeout(() => {
      setShowText(true);
      const audio = new Audio(starWarsTheme);
      audio.play();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <Link to={"/swtext"}>
        <div className="deathdiv d-flex">
          <img
            className="col-12 col-md-3 death m-auto animate__animated animate__slideInDown"
            src={death_star}
            alt="Death Star"
          />
        </div>
      </Link>

      {/* Mensaje de bienvenida */}
      <div className="welcome-message">
        <h1 className="animate__animated animate__fadeIn">Bienvenido al Blog de Star Wars</h1>
      </div>

      {/* Mostrar los textos de Star Wars después de 3 segundos */}
      {showText && (
        <div className="star-wars-text">
          <h2 className="star-wars-title">Episodio IV</h2>
          <p className="star-wars-subtitle">Una nueva esperanza...</p>
          <p className="star-wars-scroll">
            Hace mucho tiempo, en una galaxia muy, muy lejana...
          </p>
        </div>
      )}
    </div>
  );
};

