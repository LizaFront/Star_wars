// HTML контент в случае ошибки данных
const errorContent = (): string => {
	return `
		<article class="message is-dark">
            <div class="message-header">
                <p>Something is going wrong</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div id="content" class="message-body">
            	<img class='error-img' src='images/error.jpeg' alt='error'/>
            </div>
        </article>
	`;
};
