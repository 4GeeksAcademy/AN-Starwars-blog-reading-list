import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            Hace mucho tiempo, en una galaxia muy, muy lejana... <br /><br />
            El imperio galáctico, bajo el mando de Darth Vader, <br /><br />
            ha oprimido a la galaxia en su búsqueda por dominarla por completo.<br /><br />
            Sin embargo, un joven principe llamado Armand Nicolas, líder de la rebelión<br />
            ha robado los planos secretos de la estación espacial imperial<br /><br />
            conocida como la Estrella de la Muerte, la más temida<br /><br />
            arma de destrucción masiva de la galaxia. <br /><br />
            Ahora, Armand y su equipo de rebeldes deben encontrar<br /><br />
            una manera de derrotar al imperio y restaurar la paz y justicia en la galaxia...<br /><br />
          </p>
        </div>
      )}
    </div>
  );
};

