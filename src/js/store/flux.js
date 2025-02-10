const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			vehicles: [],
			planets: [],
			favorites: [],
			character: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getInitialCharacters: () => {
				fetch(`https://www.swapi.tech/api/people`)
					.then(res => {
						if (!res.ok) throw Error(`Personajes no encontrados`)
						return res.json();
					})
					.then(response => {
						setStore({ characters: response.results });
					})
					.catch(error => console.error(error));
			},
			getCharactersByid: (uid) => {
				fetch(`https://www.swapi.tech/api/people/${uid}`)
					.then(res => {
						if (!res.ok) throw Error(`Personaje no encontrado`)
						return res.json();
					})
					.then(response => {
						setStore({ character: response.result.properties });
					})
					.catch(error => console.error("fallo algo " + error));
			},
			getInitialStarships: () => {
				fetch(`https://www.swapi.tech/api/Starships`)
					.then(res => {
						if (!res.ok) throw Error(`Vehiculos no encontrados`)
						return res.json();
					})
					.then(response => {
						setStore({ vehicles: response.results });
					})
					.catch(error => console.error(error));
			},
			getStarshipsByid: () => {
				fetch(`https://www.swapi.tech/api/starships/${id}`)
					.then(res => {
						if (!res.ok) throw Error(`Vehiculo no encontrado`)
						return res.json();
					})
					.then(response => {
						setStore(response.result);
					})
					.catch(error => console.error(error));
			},
			getInitialPlanets: () => {
				fetch(`https://www.swapi.tech/api/planets`)
					.then(res => {
						if (!res.ok) throw Error(`Planetas no encontrados`)
						return res.json();
					})
					.then(response => {
						setStore({ planets: response.results });
					})
					.catch(error => console.error(error));
			},
			getPlanetsByid: () => {
				fetch(`https://www.swapi.tech/api/planets/${id}`)
					.then(res => {
						if (!res.ok) throw Error(`Personaje no encontrado`)
						return res.json();
					})
					.then(response => {
						setplanets(response.result);
					})
					.catch(error => console.error(error));
			},
			addFavorites: (newFavorite) => {
				const store = getStore();
				const favorite = store.favorites.concat(newFavorite);
				setStore({ favorite: favorite });
			},
			removeFavorites: (index) => {
				const store = getStore;
				const favorite = store.favorite.filter((c, i) => {
					return index !== i
				});
				setStore({ favorite: favorite });
			}
		}
	};
};

export default getState;
