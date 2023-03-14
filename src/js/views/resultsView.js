import View from './View.js';
import icons from 'url:../../../src/img/icons.svg';

class ResultsView extends View {
	_parentElement = document.querySelector('.results');

	_generateMarkup() {
		const check =
			this._data.length >= 1
				? this._data.map(this._generateMarkupPreview).join('')
				: this._generateMarkupPreview(this._data);
		return check;
	}

	addHandlerRender(handler) {
		['load'].forEach((ev) => window.addEventListener(ev, handler));
	}

	_generateMarkupPreview(result) {
		return `
					<li class="preview">
						<a class="preview__link preview__link--active" href="#2343"></a>
						<div class="card" style="background: radial-gradient(circle at 50% 0%, ${
							result.colors
						} 36%, #ffffff 36%)">
						<p class="dex-num">#${result.id}</p>
							<p class="hp"><span>HP</span>${result.hp}</p>
							<figure class="preview__fig">
								<img class="fig" src="${result.image}" />
							</figure>
							<h4 class="txt-description">${
								result.name[0].toUpperCase() + result.name.slice(1)
							}</h4>
							<div class="types">
								<span>${
									result.types[0]?.type.name[0].toUpperCase() +
									result.types[0].type.name.slice(1)
								}</span>
								<span>${result.types[1]?.type.name ?? ''}</span>
							</div>
							<div class="stats">
								<div>
									<h3>${result.attack}</h3>
									<p>Attack</p>
								</div>
								<div>
									<h3>${result.defense}</h3>
									<p>Defense</p>
								</div>
								<div>
									<h3>${result.speed}</h3>
									<p>Speed</p>
								</div>
							</div>
						</div>
					</li>`;
	}
}

export default new ResultsView();
