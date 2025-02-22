import React, { useEffect, useState, useRef } from "react";
import starWarsTheme from "../../audio/StarWarsMainTheme.mp3";
import 'animate.css'
import '../../styles/intro.css'


export const Home = () => {
  const [showText, setShowText] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5); 
  const [isMuted, setIsMuted] = useState(false); 
  const audioRef = useRef(null); 

  const scroll =  window.scrollTo({
    top:window.innerHeight / 2,
    behavior: "smooth",
  });
  useEffect(() => {
    // Reproducir la música de Star Wars al cargar
    const audio = new Audio(starWarsTheme);
    audioRef.current = audio;
    audio.volume = volume; 
    audioRef.current.play();
    audio.loop = true;
    

    scroll;

    // Mostrar el texto después de 3 segundos
    const timer = setTimeout(() => {
      setShowText(true);
      setShowWelcome(false);
    }, 3000);

    audioRef.current.onended = () => {
      audio.play(); 
      setShowText(false); 
      setTimeout(() => {
        setShowText(true); 
      }, 1000);
    };
    // Detener la música cuando el componente se desmonta
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []); 

  const increaseVolume = () => {
    setVolume(1);
    if(audioRef.current){
     audioRef.current.volume = 1;
    }
  };

  const decreseVolume = ()=>{
    if (!isMuted){
      setVolume(0);
      if (audioRef.current){
        audioRef.current.volume = 0;
      }
      setIsMuted(true);
    } else{
      setVolume(0.1);
      if (audioRef.current){
        audioRef.current.volume = 0.1;
      }
      setIsMuted(false);
    }
  };
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };


  return (
    <div className="home-container">
      {/* Mensaje de bienvenida */}
      {showWelcome &&(<div className="welcome-message">
        <h1 className="animate__animated animate__fadeIn">Bienvenido al Blog de Star Wars</h1>
      </div>
)}
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

<div id="player">
		<i className="fa fa-volume-down" onClick={increaseVolume}></i>
    <input type="range" min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          />
    <i
          className={`fa ${isMuted || volume === 0 ? 'fa-volume-off' : 'fa-volume-down'}`}
          onClick={decreseVolume}
        ></i>
	</div>
    </div>
  );
};
