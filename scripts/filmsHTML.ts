// Функция генерации динамического HTML кода для Фильма
const getHTMLContentFilms = (data: DataType): string => {
	if (!data || data.hasOwnProperty('detail')) {
		return errorContent();
	}

	if ('episode_id' in data) {
		const {
			title,
			episode_id,
			opening_crawl,
			producer,
			director,
			release_date,
		} = data;

		// функция получения названия месяца
		const getMonthName = (month: string) => {
			const monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];

			const monthName = monthNames[parseInt(month, 10) - 1];

			return monthName;
		};

		//функция преобразования Даты в формат (day.month.year)
		const formatDate = (str: string) => {
			const date = str.split('-');

			const day = date[2];
			const month = getMonthName(date[1]);
			const year = date[0];

			const formattedDate = `${day} ${month} ${year}`;

			return formattedDate;
		};

		const dateRelease = formatDate(release_date);

		return `
			<article class="message is-dark">
				<div class="message-header">
					<p>${title}</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				<div id="content" class="message-body">
					Episode: ${episode_id},<br>
					<br> ${opening_crawl}<br><br>
					Producer: ${producer},<br>
					Director: ${director},<br>
					Release: ${dateRelease}<br>
				</div>
			</article>
		`;
	}

	return errorContent();
};
