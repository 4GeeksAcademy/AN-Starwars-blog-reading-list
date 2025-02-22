import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import imgdefault from '../../img/vader.png';


export const CharacterDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const [loading, setLoading] = useState(true);

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
                </div>
            </div>
        );
    }
    if (!character) {
        return <div className="container">
            <div className="alert alert-danger mt-5" role="alert">
                <strong>Error:</strong> Character not found error internal swapapi.
            </div>
        </div>
    }

    const characterData = data.characters.find(item => item.id === parseInt(uid));
    const imageUrl = characterData?.image || imgdefault;
    const description = characterData?.description || "Description not available"

    return (
        <div className="container">
            <div className="card container mb-5">
                <div className="d-flex flex-column flex-md-row p-4">
                    {/* Contenedor de la imagen */}
                    <div className="image-container mb-3 mb-md-0 d-flex justify-content-center" style={{ maxWidth: '540px', width: '100%' }}>
                        <img
                            src={imageUrl}
                            alt={character.name}
                            className="img-fluid img_char"
                            onError={(e) => e.target.src = imgdefault}
                        />
                    </div>

                    {/* Contenedor de la descripción */}
                    <div className="description-container ms-md-4 mt-3 mt-md-0">
                        <h2 className="text-white char text-center">
                            {character ? character.name : "Cargando..."}
                        </h2>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>

                {/* Contenedor de los detalles adicionales */}
                <div className="card-footer">
                    <h5 className="info">Additional Info</h5>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Gender</strong></p>
                            <p>{character.gender}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Skin Color</strong></p>
                            <p>{character.skin_color}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Eye Color</strong></p>
                            <p>{character.eye_color}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Birth Year</strong></p>
                            <p>{character.birth_year}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Height</strong></p>
                            <p>{character.height} cm</p>
                        </div>
                        <div className="text-center pe-3 mb-3 mb-md-0">
                            <p><strong>Mass</strong></p>
                            <p>{character.mass} kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
