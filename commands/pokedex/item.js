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

/* eslint-disable sort-vars */

const Discord = require('discord.js'),
	Matcher = require('did-you-mean'),
	path = require('path'),
	commando = require('discord.js-commando'),
	{oneLine} = require('common-tags'),
	request = require('snekfetch'),
	requireFromURL = require('require-from-url/sync');

/* eslint-enable sort-vars */

/* eslint-disable one-var */

const capitalizeFirstLetter = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	links = {
		'aliases': 'https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/aliases.js',
		'items': 'https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/items.js'
	};
/* eslint-enable one-var */


module.exports = class itemCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'item',
			'group': 'pokedex',
			'aliases': ['it', 'bag'],
			'memberName': 'item',
			'description': 'Get the info on an item in Pokémon',
			'examples': ['item {Item Name}', 'item Life Orb'],
			'guildOnly': false,

			'args': [
				{
					'key': 'item',
					'prompt': 'Get info on which item?',
					'type': 'string',
					'label': 'Item to find'
				}
			]
		});

		this.items = {};
		this.pokeAliases = {};
		this.match = [];
	}

	async fetchItems () {
		if (Object.keys(this.items).length !== 0) {
			return this.items;
		}

		const abilityData = await request.get(links.items);

		if (abilityData) {
			this.items = requireFromURL(links.items).BattleItems;
		} else {
			this.items = require(path.join(__dirname, 'data/items.js')).BattleItems; // eslint-disable-line global-require
		}

		this.match = new Matcher(Object.keys(this.items).join(' ')); // eslint-disable-line one-var

		return this.items;
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

	async fetchImage (item) {

		try {
			await request.get(`https://raw.githubusercontent.com/110Percent/beheeyem-data/master/sprites/items/${item.name.toLowerCase().replace(' ', '_')}.png`);
		} catch (err) {
			return `https://play.pokemonshowdown.com/sprites/itemicons/${item.name.toLowerCase().replace(' ', '-')}.png`;
		}

		return `https://raw.githubusercontent.com/110Percent/beheeyem-data/master/sprites/items/${item.name.toLowerCase().replace(' ', '_')}.png`;
	}

	async run (msg, args) {
		const aliases = await this.fetchAliases(),
			itemEmbed = new Discord.MessageEmbed(),
			items = await this.fetchItems();


		let item = {},
			itemName = args.item.toLowerCase();

		if (aliases[itemName]) {
			itemName = aliases[itemName];
		}
		itemName = itemName.toLowerCase();

		for (let i = 0; i < Object.keys(items).length; i += 1) {
			if (items[Object.keys(items)[i]].id.toLowerCase() === itemName.replace(' ', '').replace('\'', '')) {
				item = items[Object.keys(items)[i]];
				break;
			}
		}

		const imgURL = await this.fetchImage(item); // eslint-disable-line one-var

		if (Object.keys(item).length !== 0) {
			itemEmbed
				.setColor('#FF0000')
				.setThumbnail('https://favna.s-ul.eu/LKL6cgin.png')
				.setAuthor(`${capitalizeFirstLetter(item.name)}`, imgURL)
				.addField('Description', item.desc)
				.addField('Generation Introduced', item.gen)
				.addField('External Resources', oneLine `
                [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/${capitalizeFirstLetter(item.name.replace(' ', '_').replace('\'', ''))})  
                |  [Smogon](http://www.smogon.com/dex/sm/items/${item.name.toLowerCase().replace(' ', '_')
		.replace('\'', '')})  
                |  [PokémonDB](http://pokemondb.net/item/${item.name.toLowerCase().replace(' ', '-')
		.replace('\'', '')})`);

			return msg.embed(itemEmbed, `**${capitalizeFirstLetter(item.name)}**`);
		}

		/* eslint-disable one-var */

		const dym = this.match.get(args.item),
			dymString = dym !== null ? `Did you mean \`${dym}\`?` : 'Maybe you misspelt the item name?';

		/* eslint-enable one-var */

		return msg.reply(`⚠ Item not found! ${dymString}`);

	}
};