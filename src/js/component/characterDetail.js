import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID del personaje
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
export const CharacterDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const [loading, setLoading] = useState(true); // Estado para mostrar la pantalla de carga

    useEffect(() => {
        // Llamamos a la acción para obtener los detalles del personaje por ID
        actions.getCharactersByid(id);

        // Cuando los datos se han cargado, actualizamos el estado de 'loading' a false
        setLoading(false);
    }, []);

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
        return <p className="nfd">Personaje no encontrado.</p>; // Si no se encuentra el personaje
    }
    const imageUrl = data.characters.find(item => item.id === parseInt(id))?.image || "https://static.wikia.nocookie.net/starwars/images/4/4e/Darth_Vader_SWSB.png/revision/latest/scale-to-width-down/350?cb=20190226195745";
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
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    {/*Nombre y lorem */}
                    <div style={{ color: "#e5e5e5", fontStyle: "italic" }}>
                        <h2 className="text-white text-center" style={{ textTransform: "uppercase" }}>
                            {character.name}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        </p>
                    </div>
                </div>
                <div className="card-footer" style={{ backgroundColor: "#333", color: "#fff", padding: "1rem" }}>
                    <div class="light-saber-bar" style={{ marginBottom: "15px"}}>
                        <div class="saber-blade"></div>
                        <div class="saber-hilt"></div>
                    </div>

                    <h5>Additional Info:</h5>
                    {/* Aquí tenemos una fila horizontal */}
                    <div className="d-flex flex-wrap" style={{ marginBottom: "15px" }}>
                        <div style={{ marginRight: "20px" }}><strong>Gender:</strong> {character.gender}</div>
                        <div style={{ marginRight: "20px" }}><strong>Skin Color:</strong> {character.skin_color}</div>
                        <div style={{ marginRight: "20px" }}><strong>Eye Color:</strong> {character.eye_color}</div>
                    </div>
                    {/* Información adicional debajo, en vertical */}
                    <div className="d-flex flex-column">
                        <div style={{ marginBottom: "10px" }}><strong>Birth Year:</strong> {character.birth_year}</div>
                        <div style={{ marginBottom: "10px" }}><strong>Height:</strong> {character.height} cm</div>
                        <div><strong>Mass:</strong> {character.mass} kg</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
