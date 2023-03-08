import * as model from './model.js';
import resultView from './views/resultsView.js';
import View from './Views/View.js';

const controlPokemon = async function () {
	try {
		await model.loadPokemon();

		resultView.render(model.state.pokemon);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	resultView.addHandlerRender(controlPokemon);
};
init();
