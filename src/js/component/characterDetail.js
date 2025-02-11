import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID del personaje
import { Context } from "../store/appContext";

export const CharacterDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const [loading, setLoading] = useState(true); // Estado para mostrar la pantalla de carga

    useEffect(() => {
        // Llamamos a la acción para obtener los detalles del personaje por ID
        actions.getCharactersByid(id);

        // Cuando los datos se han cargado, actualizamos el estado de 'loading' a false
        setLoading(false); // Asegúrate de poner esto después de que los datos se obtienen
    }, [id, actions]); // Dependemos de 'id' y 'actions' para que se ejecute cada vez que cambie el id

    const character = store.character;

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); // Muestra el spinner de carga mientras se obtienen los datos
    }

    if (!character) {
        return <p>Personaje no encontrado.</p>; // Si no se encuentra el personaje
    }

    return (
        <div className="character-detail">
            <div className="card">
                <h2>{character.name}</h2>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Birth Year:</strong> {character.birth_year}</p>
                <p><strong>Height:</strong> {character.height} cm</p>
                <p><strong>Mass:</strong> {character.mass} kg</p>
                {/* Agrega más detalles según lo que necesites */}
            </div>
        </div>
    );
};
