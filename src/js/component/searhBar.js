import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga para la búsqueda
    const [selectedIndex, setSelectedIndex] = useState(-1); // Para navegar entre los resultados

    const categories = ["characters", "planets", "vehicles"];

 
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredResults([]);
            return;
        }

        setIsLoading(true); 

        const results = categories.flatMap((category) => {
            const items = data[category].filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return items.map(item => ({
                ...item,
                category: category
            }));
        });

       
        setTimeout(() => {
            setFilteredResults(results);
            setIsLoading(false); 
        }, 1000); 
    }, []); 

  
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Función para manejar las teclas
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            if (selectedIndex < filteredResults.length - 1) {
                setSelectedIndex(selectedIndex + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
            }
        } else if (e.key === "Enter" && selectedIndex !== -1) {
            const selectedResult = filteredResults[selectedIndex];
            handleResultClick(selectedResult.category, selectedResult.id);
        }
    };

    const handleResultClick = (category, uid) => {
      
        setIsLoading(true);

      
        setTimeout(() => {
            setIsLoading(false);
            navigate(`/${category}/${uid}`);
        }, 1500); // Simula una carga de 1.5 segundos
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir la recarga de la página al hacer submit
    };

    return (
        <div className="searchbar-container">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar personajes, planetas o vehículos..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-outline-success" type="submit">
                    Buscar
                </button>
            </form>

            {/* Mostrar el spinner de carga mientras isLoading es true */}
            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="autocomplete-results">
                    {filteredResults.length > 0 ? (
                        <ul>
                            {filteredResults.map((result, index) => (
                                <li
                                    key={result.id}
                                    onClick={() => handleResultClick(result.category, result.id)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: selectedIndex === index ? "#e9ecef" : "transparent",
                                    }}
                                >
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchQuery && <p>No se encontraron resultados</p>
                    )}
                </div>
            )}
        </div>
    );
};
