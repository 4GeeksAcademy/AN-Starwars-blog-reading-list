import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import imgdefault from '../../img/vader.png'; 

export const StarshipDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!store.starship || store.starship.uid !== uid) {
            setLoading(true);
            actions.getStarshipsByid(uid)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const { starship } = store;

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                </div>
            </div>
        );
    }

    if (!starship) {
        return (
            <div className="container">
                <div className="alert alert-danger mt-5" role="alert">
                    <strong>Error:</strong> Starship not found, internal error from SWAPI.
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="card container mb-5">
                <div className="d-flex flex-column flex-md-row p-4">
                    {/* Contenedor de la imagen */}
                    <div className="image-container mb-3 mb-md-0 d-flex justify-content-center" style={{ maxWidth: '540px', width: '100%' }}>
                        <img
                            src={imgdefault} 
                            alt={starship.name}
                            className="img-fluid img_char"
                            onError={(e) => e.target.src = imgdefault} 
                        />
                    </div>

                    {/* Contenedor de la descripción */}
                    <div className="description-container ms-md-4 mt-3 mt-md-0">
                        <h2 className="text-white char text-center">
                            {starship.name}
                        </h2>
                        <p>
                            {starship.model} - {starship.manufacturer}
                        </p>
                    </div>
                </div>

                {/* Contenedor de los detalles adicionales */}
                <div className="card-footer">
                    <h5 className="info">Additional Info</h5>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Starship Class</strong></p>
                            <p>{starship.starship_class}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Manufacturer</strong></p>
                            <p>{starship.manufacturer}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Cost</strong></p>
                            <p>{starship.cost_in_credits} credits</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Length</strong></p>
                            <p>{starship.length} meters</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Max Speed</strong></p>
                            <p>{starship.max_atmosphering_speed} km/h</p>
                        </div>
                        <div className="text-center pe-3 mb-3 mb-md-0">
                            <p><strong>Cargo Capacity</strong></p>
                            <p>{starship.cargo_capacity} kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
