// Функция генерации динамического HTML кода для Персонажа
const getHTMLContentPerson = (data: DataType, planet?: string): string => {
	if (!data || data.hasOwnProperty('detail')) {
		return errorContent();
	}

	if ('skin_color' in data) {
		const {
			name,
			height,
			mass,
			hair_color,
			birth_year,
			eye_color,
			gender,
			skin_color,
			films,
		} = data;
		let filmsList = films.join('<br>');

		return `
			<article class="message is-dark">
				<div class="message-header">
					<p>${name}</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				<div id="content" class="message-body">
					Birthday year: ${birth_year},<br>
					Gender: ${gender},<br>
					Height: ${height},<br>
					Mass: ${mass},<br>
					Skin Color: ${skin_color},<br>
					Hair Color: ${hair_color},<br>
					Eye Color: ${eye_color},<br>
					Homeworld: ${planet},<br>
					Films: <br> 
					<div class='films'>${filmsList}</div>
				</div>
			</article>
		`;
	}

	return errorContent();
};
