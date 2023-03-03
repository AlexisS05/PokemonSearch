export const state = {
	pokemon: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: 10,
	},
};

const fetchJson = (url) =>
	fetch(url)
		.then((r) => r.json())
		.catch(console.log);
export const loadPokemon = async () => {
	const [arrayA, arrayB] = await Promise.all([
		Promise.all(
			new Array(151)
				.fill(0)
				.map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon/${i + 1}`))
		),
		Promise.all(
			new Array(151)
				.fill(0)
				.map((_, i) =>
					fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
				)
		),
	]);

	state.pokemon = arrayA.map((poke) => {
		return {
			name: poke.name,
			image: poke.sprites.front_default,
		};
	});
	console.log(state.pokemon);
	console.log(arrayA);
	console.log(arrayB);
	// arrayAB(arrayA, arrayB);
};

// export const arrayAB = (arrayA, arrayB) => {
// 	arrayA.forEach(function (n) {
// 		let index = n.id - 1;
// 		arrayA[index] = {
// 			...arrayA[index],
// 			...arrayB[index],
// 		};
// 	});
// };
