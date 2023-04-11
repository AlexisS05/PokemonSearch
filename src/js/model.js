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
	try {
		const [arrayA, arrayB] = await Promise.all([
			Promise.all(
				new Array(900)
					.fill(0)
					.map((_, i) =>
						fetchJson(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
					)
			),
			// Promise.all(new Array(151).fill(0).map((_, i) => fetchJson())),
		]);

		state.pokemon = arrayA.map((poke) => {
			const types = poke.types.map((el) => el.type.name);
			const main_types = Object.keys(typeColor);
			const typeFind = main_types.find((type) => {
				return types.indexOf(type) > -1;
			});
			const newImageName = { changeName: Object.values(poke.sprites.other) };

			return {
				id: poke.id,
				name: poke.name,
				image: newImageName.changeName[2].front_default,
				types: poke.types,
				colors: typeColor[typeFind],
				attack: poke.stats[1].base_stat,
				hp: poke.stats[0].base_stat,
				defense: poke.stats[2].base_stat,
				speed: poke.stats[5].base_stat,
			};
		});
	} catch (err) {
		console.error(err);
	}
};

export const loadPokemonResults = async function (query) {
	try {
		state.search.query = query;

		const data = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${query}`);
		// console.log(data);
		const newImageName = {
			changeName: Object.values(data.sprites.other),
		};

		state.search.results = {
			id: data.id,
			name: data.name,
			image: newImageName.changeName[2].front_default,
			types: data.types,
			colors: typeColor[data.types[0].type.name],
			attack: data.stats[1].base_stat,
			hp: data.stats[0].base_stat,
			defense: data.stats[2].base_stat,
			speed: data.stats[5].base_stat,
		};
		// console.log(state.search.results);
	} catch (err) {
		throw err;
	}
};

export const getSearchResultsPage = function () {
	return state.search.results;
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
	steel: ' #B7B7CE',
};
