import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import { object } from "prop-types";

export const Favorites = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Obtener favoritos de localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        // Asegurarte de que las listas estén cargadas
        actions.getInitialCharacters();
        actions.getInitialPlanets();
        actions.getInitialVehicles();
    }, []);

    const handleRemoveFavorite = (uid, category) => {
        const updatedFavorites = favorites.filter(
            (favorite) => !(favorite.uid === uid && favorite.category === category)
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites); // Actualiza el estado
    };
    const handleRemoveAllFavorites = () => {
        localStorage.removeItem("favorites");
        setFavorites([]);
    };
    const handleRemoveCategoryFavorites = (category) => {
        const updatedFavorites = favorites.filter(
            (favorite) => favorite.category !== category
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };
    // Agrupar favoritos por categoria
    const groupedFavorites = favorites.reduce((favcat, favorite) => {
        if (!favcat[favorite.category]) {
            favcat[favorite.category] = [];
        }
        favcat[favorite.category].push(favorite);
        return favcat;
    }, {});
    const hasFavorites = Object.keys(groupedFavorites).some((category) => groupedFavorites[category].length > 0);
    return (
        <div className="container d-flex flex-column" style={{ backgroundColor:'black',  minHeight: '100vh' }}>
            {!hasFavorites ? (
                <p className="flex-grow-1 nfd d-flex flex-column align-items-center justify-content-center text-center">
                    No tienes nada de favoritos.
                    <img
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHd5Z2FjMjZicXNuMDVpcGdqeHc1MXB4ZHRhYWdhMWw5M2sxaXB1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0GRkYJ1bIwmmd7YA/giphy.gif"
                        alt="Gif"
                        className="mt-3"
                    />
                </p>
            ) : (
                Object.keys(groupedFavorites).map((category) => {
                    const categoryFavorites = groupedFavorites[category];
                    return (
                        categoryFavorites.length > 0 && (
                            <div key={category} className="mb-5">
                                {/* Mostrar el título de la categoría solo si hay favoritos en esa categoría */}
                                <h3 className="text-center" style={{ color: "#fff", textTransform: "uppercase" }}>
                                    {category === "characters" && "Personajes"}
                                    {category === "planets" && "Planetas"}
                                    {category === "vehicles" && "Vehículos"}
                                </h3>

                                {/* Botón para eliminar todos los favoritos de esta categoría */}
                                <div className="text-center">
                                    <button
                                        className="btn btn-danger mb-3"
                                        onClick={() => handleRemoveCategoryFavorites(category)}
                                    >

                                        <i className="fa-solid fa-trash"></i>Eliminar todos los {category === "characters" ? "personajes" : category === "planets" ? "planetas" : "vehículos"} favoritos
                                    </button>
                                </div>

                                {/* Mostrar los favoritos de la categoría */}
                                <div className="d-flex flex-wrap justify-content-center">
                                    {categoryFavorites.map((favorite) => {
                                        // Buscar el elemento en el store correspondiente según la categoría
                                        let item;
                                        if (favorite.category === "characters") {
                                            item = store.characters.find((char) => char.uid === favorite.uid);
                                        } else if (favorite.category === "planets") {
                                            item = store.planets.find((planet) => planet.uid === favorite.uid);
                                        } else if (favorite.category === "vehicles") {
                                            item = store.vehicles.find((vehicle) => vehicle.uid === favorite.uid);
                                        }

                                        return (
                                            item && (
                                                <Card
                                                    key={`${favorite.category}-${favorite.uid}`}
                                                    name={item.name}
                                                    uid={item.uid}
                                                    detailsUrl={item.url}
                                                    category={favorite.category}
                                                    onToggleFavorite={handleRemoveFavorite}
                                                />
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    );
                })
            )}

            {/* Botón general para eliminar todos los favoritos */}
            {hasFavorites && (
                <div className="text-center mt-5">
                    <button className="btn btn-danger" onClick={handleRemoveAllFavorites}>
                        <i className="fa-solid fa-trash"></i> Eliminar todos los favoritos
                    </button>
                </div>
            )}
        </div>
    );
};
