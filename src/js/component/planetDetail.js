import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import sable from "../../img/star-wars-sable.png";

export const PlanetDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        actions.getPlanetsByid(uid);
        setLoading(false);
    }, []);

    const { planet } = store;
    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); // Muestra el spinner de carga mientras se obtienen los datos
    }

    if (!planet) {
        return <p className="nfd">Vehículo no encontrado.</p>; // Si no se encuentra el vehículo
    }

    // Buscamos la imagen del vehículo según el ID
    const imageUrl = data.planets.find(item => item.id === parseInt(uid))?.image || "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExczNldmVtN2d6OGM4OXYzaW41NWtkdmI5c3Rlajg5dzJ0eGhkeWZkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TxjEiu03FfZfN68rDD/giphy.gif";

    return (
        <div className="container">
            <h1 className="text-center text-uppercase mb-4">Vehicle Detail</h1>
            <div className="card mb-5" style={{ backgroundColor: "#222", border: "1px solid #e5e5e5" }}>
                <div className="d-flex p-4">
                    {/* Imagen en la izquierda */}
                    <div style={{ marginRight: "20px" }}>
                        <img
                            src={imageUrl}
                            alt={planet.name}
                            style={{
                                objectFit: "cover",
                                maxWidth: "300px",
                                maxHeight: "200px"
                            }}
                        />
                    </div>
                    {/* Nombre y descripción */}
                    <div style={{ color: "#e5e5e5", fontStyle: "italic" }}>
                        <h2 className="text-white text-center" style={{ textTransform: "uppercase" }}>
                            {planet ? planet.name : "Cargando..."}
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
                    <div className="vehicle-info">
                        <p><strong>Name:</strong> <span className="vehicle-data">{planet.name}</span></p>
                        <p><strong>Diameter:</strong> <span className="vehicle-data">{planet.diameter}</span></p>
                        <p><strong>Orbital period:</strong> <span className="vehicle-data">{planet.orbital_period}</span></p>
                        <p><strong>Rotation period:</strong> <span className="vehicle-data">{planet.rotation_period}</span></p>
                        <p><strong>Gravity:</strong> <span className="vehicle-data">{planet.gravity}</span></p>
                        <p><strong>Climate:</strong> <span className="vehicle-data">{planet.climate}</span></p>
                        <p><strong>Terrain:</strong> <span className="vehicle-data">{planet.terrain}</span></p>
                        <p><strong>Surface water: <span className="vehicle-data">{planet.surface_water}</span></strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};