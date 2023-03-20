import * as model from './model.js';
import resultView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlPokemon = async function () {
	try {
		resultView.renderSpinner();

		await model.loadPokemon();

		resultView.render(model.state.pokemon);
	} catch (err) {
		console.error(err);
	}
};

const controlSearchResults = async function () {
	try {
		const query = searchView.getQuery();
		if (!query) return;

		await model.loadPokemonResults(query);

		resultView.render(model.getSearchResultsPage());
	} catch (err) {
		resultView.renderError();
	}
};

const init = function () {
	resultView.addHandlerRender(controlPokemon);
	searchView.addHandlerSearch(controlSearchResults);
};
init();
