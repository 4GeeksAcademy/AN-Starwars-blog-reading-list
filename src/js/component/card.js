import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import data from '../component/imgdata.json';
import imgdefault from '../../img/vader.png'
export const Card = ({ name, uid, category, detailsUrl, onToggleFavorite }) => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    // Buscar imagen correspondiente
    const getImageByCategoryAndId = (category, uid) => {
        const categoryData = data[category]; // 'characters', 'planets', or 'vehicles'
        if (!categoryData) {
            return imgdefault;
        }
        const item = categoryData.find(item => String(item.id) === String(uid));
        if (!item) {
            return imgdefault;
        }
        return item.image;
    };

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.uid === uid && favorite.category === category
        );
        setIsFavorite(isAlreadyFavorite);
    }, []);

    // AÑADIR FAVORITO
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const currentFavorite = { uid, category }; // Favorito actual

        // Verificar si el favorito ya existe
        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.uid === uid && favorite.category === category
        );

        if (isAlreadyFavorite) {
            // Si ya está, eliminarlo
            const updatedFavorites = favorites.filter(
                (favorite) => !(favorite.uid === uid && favorite.category === category)
            );
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(false);

            if (onToggleFavorite) onToggleFavorite(uid, category);
        } else {
            favorites.push(currentFavorite);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };
    // Obtener la imagen usando la función getImageByCategoryAndId
    const imageUrl = getImageByCategoryAndId(category, uid);

    return (
        <div className="card m-3 text-center" style={{ width: "12rem", border: "1px solid", borderRadius: "10px", backgroundColor: "#222" }}>
            <div className="card-img-container" style={{ height: "180px", overflow: "hidden", borderRadius: "10px 10px 0 0", borderBottom: "4px solid #e5e5e5" }}>
                <img
                    src={imageUrl}
                    className="card-img-top w-100 h-100 cardimg object-fit-cover"
                    alt={`${name}`}
                    onError={(e) => e.target.src = imgdefault}
                    onClick={() => navigate(`/${category}/${uid}`)}
                />
            </div>
            <div className="card-body" style={{ padding: "1rem", color: "#fff" }}>
                <h6 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "600", color: "#e5e5e5", textTransform: "uppercase" }}>
                    {name}</h6>
                <div className="d-flex flex-column justify-content-center">
                    <button className="Btn text-center" onClick={() => navigate(`/${category}/${uid}`)}>
                    </button>
                    <i
                        className={`fa fa-solid fa-heart mt-3 ${isFavorite ? "text-danger" : "text-secondary"}`}
                        onClick={toggleFavorite}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
        </div>
    );
};
