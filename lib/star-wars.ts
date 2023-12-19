// Модуль для работы с API Star Wars.
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Код ниже разбирать не нужно.
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.js.

interface IPlanet {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	population: string;
	surface_water: string;
	terrain: string;
	films: string[];
}

interface IPerson {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	birth_year: string;
	eye_color: string;
	gender: string;
	skin_color: string;
	films: string[];
	homeworld?: string;
}

interface ISpecies {
	name: string;
	language: string;
	skin_colors: string;
	hair_colors: string;
	eye_colors: string;
	designation: string;
	classification: string;
	average_lifespan: string;
	average_height: string;
	films: string[];
	homeworld?: string;
}

interface IFilm {
	title: string;
	episode_id: string;
	opening_crawl: string;
	producer: string;
	director: string;
	release_date: string;
}

type Result = IPerson[] | IPlanet[] | ISpecies[];
type DataType = IPerson | ISpecies | IPlanet | IFilm;

interface IData {
	results: Result;
}

const starWars = {
	// --- Search Methods ---

	searchCharacters: (query: string): Promise<IData> => {
		return new Promise((resolve) => {
			fetch(`https://swapi.dev/api/people/?search=${query}`)
				.then((response) => response.json())
				.then((characters) => resolve(characters))
				.catch((err) => console.log('searchCharacters error: ', err));
		});
	},

	searchPlanets: (query: string): Promise<IData> => {
		return new Promise((resolve) => {
			fetch(`https://swapi.dev/api/planets/?search=${query}`)
				.then((response) => response.json())
				.then((planets) => resolve(planets))
				.catch((err) => console.log('searchPlanets error: ', err));
		});
	},

	searchSpecies: (query: string): Promise<IData> => {
		return new Promise((resolve) => {
			fetch(`https://swapi.dev/api/species/?search=${query}`)
				.then((response) => response.json())
				.then((species) => resolve(species))
				.catch((err) => console.log('searchSpecies error: ', err));
		});
	},

	// --- Get By Id Methods ---

	getCharactersById: async (id: number | string) =>
		await (await fetch(`https://swapi.dev/api/people/${id}`)).json(),

	getPlanetsById: async (id: number | string) =>
		await (await fetch(`https://swapi.dev/api/planets/${id}`)).json(),

	getSpeciesById: async (id: number | string) =>
		await (await fetch(`https://swapi.dev/api/species/${id}`)).json(),

	getFilmsById: async (id: number | string) =>
		await (await fetch(`https://swapi.dev/api/films/${id}`)).json(),
};
