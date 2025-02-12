import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID del personaje
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import sable from "../../img/star-wars-sable.png";
import imgdefault from '../../img/vader.png';

export const CharacterDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    const [loading, setLoading] = useState(true); // Estado para mostrar la pantalla de carga

    useEffect(() => {
        if (!store.character || store.character.uid !== uid) {
            setLoading(true);
            actions.getCharactersByid(uid) 
                .then(() => setLoading(false))
                .catch(() => setLoading(false)); 
        } else {
            setLoading(false);
        }
    }, []); 

    const { character } = store;

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); 
    }

    if (!character) {
        return <p className="nfd">Personaje no encontrado.</p>; // Si no se encuentra el personaje
    }
    const imageUrl = data.characters.find(item => item.id === parseInt(uid))?.image || imgdefault;

    return (
        <div className="container">
            <h1 className="text-center text-uppercase mb-4">Character Detail</h1>
            <div className="card mb-5" style={{ backgroundColor: "#222", border: "1px solid #e5e5e5" }}>
                <div className="d-flex p-4">
                    {/*imagen en la izquierda */}
                    <div style={{ marginRight: "20px" }}>
                    <img
    src={imageUrl}
    alt={character.name}
    style={{
        width: "800px",  
        height: "600px", 
        objectFit: "cover",  
    }}
    onError={(e) => e.target.src = imgdefault}
/>

                    </div>
                    <div style={{ color: "#e5e5e5", fontStyle: "italic" }}>
                        <h2 className="text-white text-center" style={{ textTransform: "uppercase" }}>
                            {character ? character.name : "Cargando..."}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        </p>
                    </div>

                </div>

                <div className="card-footer" style={{ backgroundColor: "#333", color: "#fff", padding: "1rem" }}>
                    <div className="lightsaber-container">
                        <img
                            src={sable}
                            alt="Lightsaber"
                            className="lightsaber-img"
                        />
                    </div>
                    <h5 className="info">Additional Info:</h5>
                    <div className="character-info">
                        <p><strong>Gender:</strong> <span className="character-data">{character.gender}</span></p>
                        <p><strong>Skin Color:</strong> <span className="character-data">{character.skin_color}</span></p>
                        <p><strong>Eye Color:</strong> <span className="character-data">{character.eye_color}</span></p>
                        <p><strong>Birth Year:</strong> <span className="character-data">{character.birth_year}</span></p>
                        <p><strong>Height:</strong> <span className="character-data">{character.height} cm</span></p>
                        <p><strong>Mass:</strong> <span className="character-data">{character.mass} kg</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
