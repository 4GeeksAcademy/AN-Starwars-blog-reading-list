import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import starWarsTheme from "../../audio/StarWarsMainTheme.mp3";

// Importamos los iconos de Bootstrap
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export const Home = () => {
  const [showText, setShowText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Estado para saber si la música está sonando
  const [volume, setVolume] = useState(0.5); // Control del volumen (0.0 a 1.0)
  const [isMuted, setIsMuted] = useState(false); // Control del mute
  const audioRef = useRef(null); // Referencia al audio

  useEffect(() => {
    // Reproducir la música de Star Wars al cargar
    const audio = new Audio(starWarsTheme);
    audioRef.current = audio;
    audio.volume = volume; // Establecer el volumen inicial
    audio.play();

    // Mostrar el texto después de 3 segundos
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000);

    // Detener la música cuando el componente se desmonta
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []); // Reproducir y cambiar volumen si cambia

  const toggleMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const increaseVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume; // Restaurar volumen cuando desmuteamos
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0; // Silenciar
      setIsMuted(true);
    }
  };

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

      {/* Controles de música en la parte superior derecha */}
      <div className="music-controls position-fixed top-0 end-0 m-3 p-2 bg-dark text-white rounded">
        <button onClick={toggleMusic} className="btn btn-light btn-sm m-1">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Barra de volumen */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={increaseVolume}
          className="form-range"
          style={{ width: "150px" }}
        />

        {/* Botón de mute */}
        <button onClick={toggleMute} className="btn btn-light btn-sm m-1">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
};
