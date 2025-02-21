import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import data from "../component/imgdata.json";
import imgdefault from '../../img/vader.png';

export const PlanetDetail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!store.planet || store.planet.uid !== uid) {
            setLoading(true);
            actions.getPlanetsByid(uid)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const { planet } = store;
    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        ); 
    }

    if (!planet) {
        return <div className="container">
        <div className="alert alert-danger mt-5" role="alert">
            <strong>Error:</strong> Planet not found error internal.
        </div>
    </div> 
    }

    // Buscamos la imagen del planeta según el ID
    const imageUrl = data.planets.find(item => item.id === parseInt(uid))?.image || imgdefault;

    return (
        <div className="container">
            <div className="card container mb-5">
                <div className="d-flex flex-column flex-md-row p-4">
                    {/* Imagen en la izquierda */}
                    <div className="image-container mb-3 mb-md-0 d-flex justify-content-center">
                        <img
                            src={imageUrl}
                            alt={planet.name}
                            className="img-fluid img_char"
                            style={{ objectFit: 'cover', maxWidth: '540px'}}
                            onError={(e) => e.target.src = imgdefault}
                        />
                    </div>
                    {/* Nombre y descripción */}
                    <div className="description-container ms-md-4 mt-3 mt-md-0">
                        <h2 className="text-white char text-center">
                            {planet ? planet.name : "Cargando..."}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        </p>
                    </div>
                </div>
                    {/* detalles */}
                <div className="card-footer">
                    <h5 className="info">Additional Info</h5>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Name</strong></p>
                            <p>{planet.name}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Diameter</strong></p>
                            <p>{planet.diameter}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Orbital Period</strong></p>
                            <p>{planet.orbital_period}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Rotation Period</strong></p>
                            <p>{planet.rotation_period}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Gravity</strong></p>
                            <p>{planet.gravity}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Climate</strong></p>
                            <p>{planet.climate}</p>
                        </div>
                        <div className="text-center border-end pe-3 mb-3 mb-md-0">
                            <p><strong>Terrain</strong></p>
                            <p>{planet.terrain}</p>
                        </div>
                        <div className="text-center pe-3 mb-3 mb-md-0">
                            <p><strong>Surface Water</strong></p>
                            <p>{planet.surface_water}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};