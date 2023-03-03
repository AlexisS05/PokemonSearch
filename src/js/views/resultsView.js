import View from './View.js';

class ResultsView extends View {
	_parentElement = document.querySelector('.results');

	_generateMarkup() {
		console.log(this._data);
		return this._data.map(this._generateMarkupPreview).join('');
	}

	addHandlerRender(handler) {
		['hashchange', 'load'].forEach((ev) =>
			window.addEventListener(ev, handler)
		);
	}

	_generateMarkupPreview(result) {
		return `
          <li class="preview">
						<a class="preview__link preview__link--active" href="#2343"></a>
						<figure class="preview__fig">
							<img class="fig" src="${result.image}" />
						</figure>
						<div>
							<h4 class="txt-description">${result.name}</h4>
						</div>
					</li>`;
	}
}

export default new ResultsView();
