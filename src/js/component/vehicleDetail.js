import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import imgdefault from '../../img/vader.png';

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
        console.log("vehicle loaded:", store.vehicle)
    }, []);

    const { vehicle } = store;
    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); 
    }

    if (!vehicle) {
        return(
            <div className="container">
                <div className="alert alert-danger mt-5" role="alert">
                    <strong>Error:</strong> Vehicle not found error internal.
                </div>
            </div>
        ); 
    }

    // Buscamos la imagen del vehículo según el ID
    const imageUrl = data.vehicles.find(item => item.id === uid)?.image || imgdefault;

    return (
        <div className="container">
            <div className="card container mb-5">
                <div className="d-flex flex-column flex-md-row p-4">
                    {/* contender de la izquierda */}
                    <div className="image-container mb-3 mb-md-0 d-flex justify-content-center">
                        <img
                            src={imageUrl}
                            alt={vehicle.name}
                            className="img-fluid img_char"
                            style={{ objectFit: 'cover', maxWidth: '540px' }}
                            onError={(e) => e.target.src = imgdefault}
                        />
                    </div>
                    {/* Nombre y descripción */}
                    <div className="description-container ms-md-4 mt-3 mt-md-0">
                        <h2 className="text-white text-center">
                            {vehicle ? vehicle.name : "Cargando..."}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        </p>
                    </div>
                </div>
                  {/* detalles */}
                <div className="card-footer">
                    <h5 className="info">Additional Info:</h5>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Model</strong></p>
                            <p>{vehicle.model}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Manufacturer</strong></p>
                            <p>{vehicle.manufacturer}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Cost</strong></p>
                            <p>{vehicle.cost_in_credits} credits</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Length</strong></p>
                            <p>{vehicle.length} meters</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Max Speed</strong></p>
                            <p>{vehicle.max_atmosphering_speed} km/h</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Crew</strong></p>
                            <p>{vehicle.crew}</p>
                        </div>
                        <div className="text-center pe-3 mb-3 mb-md-0">
                            <p><strong>Passengers</strong></p>
                            <p>{vehicle.passengers}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
