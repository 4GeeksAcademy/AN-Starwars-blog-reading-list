import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID del vehículo
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import sable from "../../img/star-wars-sable.png"; // Imagen para mostrar en detalles

export const VehicleDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams(); // Obtenemos el ID del vehículo desde la URL

    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        // Llamar a la acción para obtener los detalles del vehículo por ID
        actions.getVehiclesByid(uid);

        // Verificamos si la acción es correcta
        console.log("Llamada a la acción para obtener el vehículo con ID:", uid);
        setLoading(false);
    }, []);

    const { vehicle } = store;

    console.log("Datos del vehículo desde el store:", vehicle);

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); // Muestra el spinner de carga mientras se obtienen los datos
    }

    if (!vehicle) {
        console.log("No se encontró el vehículo con ID:", id);
        return <p className="nfd">Vehículo no encontrado.</p>; // Si no se encuentra el vehículo
    }

    // Buscamos la imagen del vehículo según el ID
    const imageUrl = data.vehicles.find(item => item.id === parseInt(uid))?.image || "https://via.placeholder.com/350"; // Imagen por defecto

    return (
        <div className="container">
            <h1 className="text-center text-uppercase mb-4">Vehicle Detail</h1>
            <div className="card mb-5" style={{ backgroundColor: "#222", border: "1px solid #e5e5e5" }}>
                <div className="d-flex p-4">
                    {/* Imagen en la izquierda */}
                    <div style={{ marginRight: "20px" }}>
                        <img
                            src={imageUrl}
                            alt={vehicle.name}
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
                            {vehicle ? vehicle.name : "Cargando..."}
                        </h2>
                        <p>
                            {vehicle.description || "No description available."}
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
                        <p><strong>Model:</strong> <span className="vehicle-data">{vehicle.model}</span></p>
                        <p><strong>Manufacturer:</strong> <span className="vehicle-data">{vehicle.manufacturer}</span></p>
                        <p><strong>Cost:</strong> <span className="vehicle-data">{vehicle.cost_in_credits} credits</span></p>
                        <p><strong>Length:</strong> <span className="vehicle-data">{vehicle.length} meters</span></p>
                        <p><strong>Max Speed:</strong> <span className="vehicle-data">{vehicle.max_atmosphering_speed} km/h</span></p>
                        <p><strong>Crew:</strong> <span className="vehicle-data">{vehicle.crew}</span></p>
                        <p><strong>Passengers:</strong> <span className="vehicle-data">{vehicle.passengers}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
