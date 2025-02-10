import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetail = () => {
    const { id } = useParams(); 
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCharactersByid(id); 
    }, [id, actions]);

    const character = store.character; 

    if (character === null) {
        return <p>Personaje no encontrado.</p>;
    }

    return (
        <div className="character-details">
            <div className="card">
                <h2>{character?.name}</h2>
                <p><strong>Gender:</strong> {character?.gender}</p>
                <p><strong>Birth Year:</strong> {character?.birth_year}</p>
                <p><strong>Height:</strong> {character?.height} cm</p>
                <p><strong>Mass:</strong> {character?.mass} kg</p>
                <p><strong>Eye Color:</strong> {character?.eye_color}</p>
                <p><strong>Hair Color:</strong> {character?.hair_color}</p>
            </div>
        </div>
    );
};
