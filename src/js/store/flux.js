

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			characters: [],
			vehicles: [],
			planets: [],
			favorites: [],
			character: {},
			planet: {},
			vehicle: {},
			loading: false,
		},
		actions: {
			setLoading: (isLoading) => {
				setStore({ loading: isLoading })
			},
			getInitialCharacters: async () => {
				const store = getStore();
				if (store.characters.length > 0) {
					return;
				}

				try {
					setStore({ loading: true });
					const response = await fetch(`https://www.swapi.tech/api/people`);
					if (!response.ok) throw Error(`Personajes no encontrados`);
					const data = await response.json();
					setStore({ characters: data.results });
				} catch (error) {
					console.error(error)
				} finally {
					setStore({ loading: false });
				}
			},
			getCharactersByid: async (id) => {
				const actions = getActions();
				actions.setLoading(true)
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					if (!response.ok) throw Error(`Personaje no encontrado`);
					const data = await response.json();
					setStore({ character: data.result.properties });
				}
				catch (error) {
					console.error("fallo algo " + error);
				} finally {
					setStore({ loading: false });
				}
			},
			getInitialVehicles: async () => {
				const store = getStore();
				if (store.vehicle.length > 0) {
					return;
				}
				try {
					setStore({ loading: true });
					const response = await fetch(`https://www.swapi.tech/api/vehicles`);
					if (!response.ok) throw Error(`Vehiculos no encontrados`);
					const data = await response.json();
					setStore({ vehicles: data.results });
				}
				catch (error) {
					console.error(error);
				} finally {
					setStore({ loading: false });
				}
			},
			getVehiclesByid: async (id) => {
				const actions = getActions();
				actions.setLoading(true);
				try {
					const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
					if (!response.ok) throw Error(`Vehiculo no encontrado`);
					const data = await response.json();
					setStore({ Vehicle: data.result.properties });
				}
				catch (error) {
					console.error(error);
				} finally {
					setStore({ loading: false });
				}
			},
			getInitialPlanets: async () => {
				const store = getStore();
				if (store.planets.length > 0) {
					return;
				}
				try {
					setStore({ loading: true });
					const response = await fetch(`https://www.swapi.tech/api/planets`);
					if (!response.ok) throw Error(`Planetas no encontrados`);
					const data = await response.json();
					setStore({ planets: data.results });
				}
				catch (error) {
					console.error(error);
				} finally {
					setStore({ loading: false });
				}
			},
			getPlanetsByid: async (id) => {
				const store = getStore();
				if (store.planet && store.planet.id === id) {
					return;
				}
				try {
					setStore({ loading: true });
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
					if (!response.ok) throw Error(`Personaje no encontrado`);
					const data = await response.json();
					setStore({ planet: data.results.properties });
				}
				catch (error) {
					console.error(error);
				} finally {
					setStore({ loading: false });
				}
			},

		}
	};
};

export default getState;
