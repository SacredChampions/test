/*
 *   This file is part of discord-self-bot
 *   Copyright (C) 2017-2018 Favna
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-statements, complexity */

/* eslint-disable sort-vars */

const Discord = require('discord.js'),
	Matcher = require('did-you-mean'),
	commando = require('discord.js-commando'),
	path = require('path'),
	dexEntries = require(path.join(__dirname, 'data/flavorText.json')),
	{oneLine} = require('common-tags'),
	request = require('snekfetch'),
	requireFromURL = require('require-from-url/sync');

/* eslint-enable sort-vars */

/* eslint-disable one-var */
const capitalizeFirstLetter = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	embedColours = {
		'Red': 16724530,
		'Blue': 2456831,
		'Yellow': 16773977,
		'Green': 4128590,
		'Black': 3289650,
		'Brown': 10702874,
		'Purple': 10894824,
		'Gray': 9868950,
		'White': 14803425,
		'Pink': 16737701
	},
	links = {
		'aliases': 'https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/aliases.js',
		'dex': 'https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/pokedex.js'
	};

/* eslint-enable one-var */

module.exports = class dexCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dex',
			'group': 'pokedex',
			'aliases': ['pokedex', 'dexfind', 'df'],
			'memberName': 'dex',
			'description': 'Get the info on a Pokémon',
			'examples': ['dex {Pokemon Name}', 'dex Dragonite'],
			'guildOnly': false,

			'args': [
				{
					'key': 'pokemon',
					'prompt': 'Get info from which Pokémon?',
					'type': 'string',
					'label': 'Pokemon to find',
					'default': 'mewtwo'
				}
			]
		});

		this.pokedex = {};
		this.pokeAliases = {};
		this.match = [];
	}

	async fetchDex () {
		if (Object.keys(this.pokedex).length !== 0) {
			return this.pokedex;
		}

		const dexData = await request.get(links.dex);

		if (dexData) {
			this.pokedex = requireFromURL(links.dex).BattlePokedex;
		} else {
			this.pokedex = require(path.join(__dirname, 'data/pokedex.js')).BattlePokedex; // eslint-disable-line global-require
		}

		this.match = new Matcher(Object.keys(this.pokedex).join(' ')); // eslint-disable-line one-var

		return this.pokedex;
	}

	async fetchAliases () {
		if (Object.keys(this.pokeAliases).length !== 0) {
			return this.pokeAliases;
		}

		const dexData = await request.get(links.aliases);

		if (dexData) {
			this.pokeAliases = requireFromURL(links.aliases).BattleAliases;
		} else {
			this.pokeAliases = require(path.join(__dirname, 'data/aliases.js')).BattlePokedex; // eslint-disable-line global-require
		}

		this.match = new Matcher(Object.keys(this.pokeAliases).join(' ')); // eslint-disable-line one-var

		return this.pokeAliases;
	}

	async fetchImage (poke) {

		try {
			await request.get(`https://cdn.rawgit.com/110Percent/beheeyem-data/44795927/webp/${poke.toLowerCase().replace(' ', '_')}.webp`);
		} catch (err) {
			return `https://play.pokemonshowdown.com/sprites/xyani/${poke.toLowerCase().replace(' ', '')}.gif`;
		}

		return `https://cdn.rawgit.com/110Percent/beheeyem-data/44795927/webp/${poke.toLowerCase().replace(' ', '_')}.webp`;
	}

	async run (msg, args) {
		const aliases = await this.fetchAliases(),
			dex = await this.fetchDex(),
			dexEmbed = new Discord.MessageEmbed();

		let abilityString = '',
			evos = '',
			genderString = 'Not stored in PokéDex',
			poke = args.pokemon.toLowerCase(),
			pokedexEntry = 'Not stored in PokéDex',
			typestring = 'Not stored in PokéDex';

		if (aliases[poke]) {
			poke = aliases[poke];
		}

		poke = poke.toLowerCase();

		if (poke.split(' ')[0] === 'mega') {
			poke = `${poke.substring(poke.split(' ')[0].length + 1)}mega`;
		}
		let pokeEntry = dex[poke]; // eslint-disable-line one-var

		if (!pokeEntry) {
			for (let index = 0; index < Object.keys(dex).length; index += 1) {
				if (dex[Object.keys(dex)[index]].num === Number(poke)) {
					poke = dex[Object.keys(dex)[index]].species.toLowerCase();
					pokeEntry = dex[poke];
					break;
				}
			}
		}
		if (!pokeEntry) {
			for (let index = 0; index < Object.keys(dex).length; index += 1) {
				if (dex[Object.keys(dex)[index]].species.toLowerCase() === poke) {
					pokeEntry = dex[Object.keys(dex)[index]];
					break;
				}
			}
		}
		if (pokeEntry) {
			poke = pokeEntry.species;
			let evoLine = `**${capitalizeFirstLetter(poke)}**`,
				preEvos = '';

			if (pokeEntry.prevo) {
				preEvos = `${preEvos + capitalizeFirstLetter(pokeEntry.prevo)} > `;
				const preEntry = dex[pokeEntry.prevo];

				if (preEntry.prevo) {
					preEvos = `${capitalizeFirstLetter(preEntry.prevo)} > ${preEvos}`;
				}
				evoLine = preEvos + evoLine;
			}
			evos = '';

			if (pokeEntry.evos) {
				evos = `${evos} > ${pokeEntry.evos.map(entry => capitalizeFirstLetter(entry)).join(', ')}`;
				if (pokeEntry.evos.length < 2) {
					const evoEntry = dex[pokeEntry.evos[0]];

					if (evoEntry.evos) {
						evos = `${evos} > ${evoEntry.evos.map(entry => capitalizeFirstLetter(entry)).join(', ')}`;
					}
				}
				evoLine += evos;
			}
			if (!pokeEntry.prevo && !pokeEntry.evos) {
				evoLine += ' (No Evolutions)';
			}
			typestring = 'Type';

			if (pokeEntry.types.length > 1) {
				typestring += 's';
			}
			abilityString = pokeEntry.abilities[0];

			for (let index = 1; index < Object.keys(pokeEntry.abilities).length; index += 1) {
				if (Object.keys(pokeEntry.abilities)[index] === 'H') {
					abilityString = `${abilityString}, *${pokeEntry.abilities.H}*`;
				} else {
					abilityString = `${abilityString}, ${pokeEntry.abilities[index]}`;
				}
			}

			if (pokeEntry.gender) {
				switch (pokeEntry.gender) {
					case 'N':
						genderString = 'None';
						break;
					case 'M':
						genderString = '100% Male';
						break;
					case 'F':
						genderString = '100% Female';
						break;
					default:
						genderString = '';
						break;
				}
			}

			if (pokeEntry.genderRatio) {
				genderString = `${pokeEntry.genderRatio.M * 100}% Male | ${pokeEntry.genderRatio.F * 100}% Female`;
			}

			for (let i = 0; i < dexEntries.length; i += 1) {
				if (dexEntries[i].species_id === pokeEntry.num.toString()) {
					pokedexEntry = dexEntries[i].flavor_text;
					break;
				}
			}

			if (!pokedexEntry) {
				pokedexEntry = '*PokéDex data not found for this Pokémon*';
			}

			const imgURL = await this.fetchImage(poke);

			dexEmbed
				.setColor(embedColours[pokeEntry.color])
				.setFooter(`#${pokeEntry.num} - ${capitalizeFirstLetter(poke)}`, `https://cdn.rawgit.com/msikma/pokesprite/master/icons/pokemon/regular/${poke.replace(' ', '_').toLowerCase()}.png`)
				.setImage(imgURL)
				.setThumbnail('https://favna.s-ul.eu/LKL6cgin.png')
				.addField(typestring, pokeEntry.types.join(', '), true)
				.addField('Height', `${pokeEntry.heightm}m`, true)
				.addField('Gender Ratio', genderString, true)
				.addField('Weight', `${pokeEntry.weightkg}kg`, true)
				.addField('Egg Groups', pokeEntry.eggGroups.join(', '), true)
				.addField('Abilities', abilityString, true);
			pokeEntry.otherFormes ? dexEmbed.addField('Other Formes', pokeEntry.otherFormes.join(', '), true) : null;
			dexEmbed
				.addField('Evolutionary Line', evoLine, false)
				.addField('Base Stats', Object.keys(pokeEntry.baseStats).map(index => `${index.toUpperCase()}: **${pokeEntry.baseStats[index]}**`)
					.join(', '))
				.addField('PokéDex Data', pokedexEntry)
				.addField('External Resource', oneLine `[Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/${capitalizeFirstLetter(poke).replace(' ', '_')}_(Pokémon\\))  
		          |  [Smogon](http://www.smogon.com/dex/sm/pokemon/${poke.replace(' ', '_')})  
		          |  [PokémonDB](http://pokemondb.net/pokedex/${poke.replace(' ', '-')})`);


			return msg.embed(dexEmbed);
		}
		const dym = this.match.get(args.pokemon), // eslint-disable-line one-var
			dymString = dym !== null ? `Did you mean \`${dym}\`?` : 'Maybe you misspelt the Pokémon\'s name?';

		return msg.reply(`⚠ Dex entry not found! ${dymString}`);
	}
};