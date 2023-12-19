"use strict";
// Функция генерации динамического HTML кода для Планеты
const getHTMLContentPlanet = (data) => {
    if (!data || data.hasOwnProperty('detail')) {
        return errorContent();
    }
    if ('gravity' in data) {
        const { name, rotation_period, orbital_period, diameter, climate, gravity, population, surface_water, terrain, films, } = data;
        const filmsList = films.join('<br>');
        return `
			<article class="message is-dark">
				<div class="message-header">
					<p>${name}</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				<div id="content" class="message-body">
					Climate: ${climate},<br>
					Gravity: ${gravity},<br>
					Diameter: ${diameter},<br>
					Population: ${population},<br>
					Rotation period: ${rotation_period},<br>
					Orbital period: ${orbital_period},<br>
					Surface water: ${surface_water},<br>
					Terrain: ${terrain},<br>
					Films: <br> 
					<div class='films'>${filmsList}</div>
				</div>
			</article>
		`;
    }
    return errorContent();
};
