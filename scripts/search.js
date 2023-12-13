//Переменные input и кнопки Поиска

const select = document.querySelectorAll('select');
const search = document.querySelectorAll('.input');
const btnSearch = document.getElementById('byQueryBtn');
const btnGetById = document.getElementById('byIdBtn');

// Переменная загрузчика и функции включения и выкллючения loader.
const spinner = document.querySelector('.spinner');

const showLoader = () => (spinner.style.visibility = 'visible');
const hideLoader = () => (spinner.style.visibility = 'hidden');

// Переменная главного контейнера с данными и функции видимости контейнера
const mainContainer = document.getElementById('result-container');

const showMainContainer = () => (mainContainer.style.visibility = 'visible');
const hideMainContainer = () => (mainContainer.style.visibility = 'hidden');

// функция получения имени планеты
const getPlanetName = async (data) => {
	if (!data) {
		return errorContent();
	}

	const { homeworld } = data;

	let name = 'unknown';

	if (homeworld) {
		const id = homeworld.split('/').filter(Boolean).pop();
		try {
			const result = await starWars.getPlanetsById(id);
			name = result.name;
		} catch (error) {
			console.error('Error:', error);
		}
	}
	return name;
};

// функция закрытия главного контейнера и очищения поля ввода
const closeMainContainer = (elem) => {
	elem.addEventListener('click', () => {
		hideMainContainer();
		search[0].value = '';
		search[1].value = '';
	});
};

// функция обработки полученных данных от fetch для Search
const resultforSearch = async (fetch, HTMLFunction, getPlanetNameFun) => {
	try {
		const result = await fetch(search[0].value);
		if (result) {
			if (getPlanetNameFun) {
				const planet = await getPlanetNameFun(result.results[0]);
				mainContainer.innerHTML = HTMLFunction(
					result.results[0],
					planet
				);
				showMainContainer();
			} else {
				mainContainer.innerHTML = HTMLFunction(result.results[0]);
				showMainContainer();
			}
		}
	} catch (error) {
		console.error('Error:', error);
	} finally {
		hideLoader();
	}

	const close = document.querySelector('.message-header');
	closeMainContainer(close);
};

// слушатель на нажатие кнопки Search
btnSearch.addEventListener('click', async () => {
	const { searchCharacters, searchPlanets, searchSpecies } = starWars;

	hideMainContainer();
	showLoader();
	if (select[0].value === 'people') {
		resultforSearch(searchCharacters, getHTMLContentPerson, getPlanetName);
	}

	if (select[0].value === 'planets') {
		resultforSearch(searchPlanets, getHTMLContentPlanet);
	}

	if (select[0].value === 'species') {
		resultforSearch(searchSpecies, getHTMLContentSpecies, getPlanetName);
	}
});

// функция обработки полученных данных от fetch для Get By Id
const resultforGetById = async (fetch, HTMLFunction) => {
	try {
		const result = await fetch(search[1].value);
		if (result) {
			hideLoader();
			mainContainer.innerHTML = HTMLFunction(result);
			showMainContainer();
		}
	} catch (error) {
		hideLoader();
		console.error('Error:', error);
	}

	const close = document.querySelector('.message-header');
	closeMainContainer(close);
};

// слушатель на нажатие кнопки Get By Id
btnGetById.addEventListener('click', async () => {
	const { getCharactersById, getPlanetsById, getSpeciesById, getFilmsById } =
		starWars;

	hideMainContainer();
	showLoader();

	if (select[1].value === 'people') {
		resultforGetById(getCharactersById, getHTMLContentPerson);
	}

	if (select[1].value === 'planets') {
		resultforGetById(getPlanetsById, getHTMLContentPlanet);
	}

	if (select[1].value === 'species') {
		resultforGetById(getSpeciesById, getHTMLContentSpecies);
	}

	if (select[1].value === 'films') {
		resultforGetById(getFilmsById, getHTMLContentFilms);
	}
});

// слушатель на нажатие Enter
document.addEventListener('keyup', async (event) => {
	if (event.code === 'Enter' && search[0].value.length !== 0) {
		btnSearch.click();
	}

	if (event.code === 'Enter' && search[1].value.length !== 0) {
		btnGetById.click();
	}
});