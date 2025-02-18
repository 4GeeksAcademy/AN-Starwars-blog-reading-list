import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import sable from "../../img/star-wars-sable.png";

export const VehicleDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!store.vehicle || store.vehicle.uid !== uid) {
            setLoading(true);
            actions.getVehiclesByid(uid)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const { vehicle } = store;
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
        return <p className="nfd">Vehículo no encontrado.</p>; // Si no se encuentra el vehículo
    }

    // Buscamos la imagen del vehículo según el ID
    const imageUrl = data.vehicles.find(item => item.id === uid)?.image || "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExczNldmVtN2d6OGM4OXYzaW41NWtkdmI5c3Rlajg5dzJ0eGhkeWZkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TxjEiu03FfZfN68rDD/giphy.gif";

    return (
        <div className="container">
            <div className="card mb-5" style={{ backgroundColor: "#222", border: "1px solid #e5e5e5" }}>
                <div className="d-flex p-4">
                    {/* Imagen en la izquierda */}
                    <div style={{ marginRight: "20px" }}>
                        <img
                            src={imageUrl}
                            alt={vehicle.name}
                            style={{
                                objectFit: "contain",
                                width: "500px",
                                height: "500px",
                            }}
                        />
                    </div>
                    {/* Nombre y descripción */}
                    <div style={{ color: "#e5e5e5", fontStyle: "italic" }}>
                        <h2 className="text-white text-center" style={{ textTransform: "uppercase" }}>
                            {vehicle ? vehicle.name : "Cargando..."}
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
