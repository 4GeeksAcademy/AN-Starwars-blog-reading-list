import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import data from '../component/imgdata.json';
export const Card = ({ name, uid, category, detailsUrl, onToggleFavorite }) => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);

    // Buscar imagen correspondiente
    const getImageByCategoryAndId = (category, uid) => {
        const categoryData = data[category]; // 'characters', 'planets', or 'vehicles'
        if (!categoryData) {
            return 'https://static.wikia.nocookie.net/starwars/images/4/4e/Darth_Vader_SWSB.png/revision/latest/scale-to-width-down/350?cb=20190226195745'; 
        }
        const item = categoryData.find(item => String(item.id) === String(uid)); 
        if (!item) {
            return 'https://static.wikia.nocookie.net/starwars/images/4/4e/Darth_Vader_SWSB.png/revision/latest/scale-to-width-down/350?cb=20190226195745'; 
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
            // Si no está, agregarlo
            favorites.push(currentFavorite);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    const handleDetails = () => {
        navigate(`/${category}/${uid}`);
    }

    // Obtener la imagen usando la función getImageByCategoryAndId
    const imageUrl = getImageByCategoryAndId(category, uid);

    return (
        <div className="card m-3 text-center" style={{ width: "12rem" }}>
            
            <div className="card-body">
                <h6 className="card-title">{name}</h6>
                <div className="d-flex flex-column justify-content-center">
                    <button className="Btn text-center" onClick={handleDetails}>
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
