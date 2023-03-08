export const state = {
	pokemon: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: 100,
	},
};

const fetchJson = (url) =>
	fetch(url)
		.then((r) => r.json())
		.catch(console.log);
export const loadPokemon = async () => {
	const [arrayA, arrayB] = await Promise.all([
		Promise.all(
			new Array(1008)
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
		const types = poke.types.map((el) => el.type.name);
		const main_types = Object.keys(typeColor);
		const typeFind = main_types.find((type) => {
			return types.indexOf(type) > -1;
		});
		console.log(typeFind);

		return {
			name: poke.name,
			image: poke.sprites.front_default,
			types: poke.types,
			colors: typeColor[typeFind],
		};
	});

	console.log(state.pokemon);
	console.log(arrayA);
	console.log(arrayB);
};
export const typeColor = {
	bug: '#26de81',
	dragon: '#ffeaa7',
	electric: '#fed330',
	fairy: '#FF0069',
	fighting: '#30336b',
	fire: '#f0932b',
	flying: '#81ecec',
	grass: '#00b894',
	ground: '#EFB549',
	ghost: '#a55eea',
	ice: '#74b9ff',
	normal: '#95afc0',
	poison: '#6c5ce7',
	psychic: '#a29bfe',
	rock: '#2d3436',
	water: '#0190FF',
};
