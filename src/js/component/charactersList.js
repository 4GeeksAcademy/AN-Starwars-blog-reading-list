import React from "react";
import { Link } from "react-router-dom";

export const CharacterList = ({ characters }) => {
    console.log("personajes:", characters)
    return (
        <div className="container my-4">
            <div className="row">
                {characters.map((character) => (
                    <div key={character.uid} className="col-12 col-md-4 mb-4">
                        {/* Card */}
                        <div className="card">
                            {/* Div vacío para la imagen (o imagen placeholder) */}
                            <div className="card-img-top" style={{ width: "100%", height: "300px", backgroundColor: "#ccc" }}></div>

                            {/* Card body con nombre del personaje y detalles */}
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">
                                <Link to={`/characters/${character.uid}`} className="btn btn-primary">Ver detalles</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
