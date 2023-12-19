// Функция генерации динамического HTML кода для Расы персонажа
const getHTMLContentSpecies = (
	data: DataType,
	planet?: string | undefined
): string => {
	if (!data || data.hasOwnProperty('detail')) {
		return errorContent();
	}

	if ('skin_colors' in data) {
		const {
			name,
			language,
			skin_colors,
			hair_colors,
			eye_colors,
			designation,
			classification,
			average_lifespan,
			average_height,
			films,
		} = data;
		const filmsList = films.join('<br>');
		return `
			<article class="message is-dark">
				<div class="message-header">
					<p>${name}</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				<div id="content" class="message-body">
					Language: ${language},<br>
					Skin colors: ${skin_colors},<br>
					Hair colors: ${hair_colors},<br>
					Eye colors: ${eye_colors},<br>
					Designation: ${designation},<br>
					Classification: ${classification},<br>
					Average lifespan: ${average_lifespan},<br>
					Average height: ${average_height},<br>
					Homeworld: ${planet},<br>
					Films: <br> 
					<div class='films'>${filmsList}</div>
				</div>
			</article>
		`;
	}

	return errorContent();
};
