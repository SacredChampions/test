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

const Discord = require('discord.js'),
	commando = require('discord.js-commando'),
	moment = require('moment'),
	superagent = require('superagent');

module.exports = class wikipediaCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'wikipedia',
			'group': 'search',
			'aliases': ['wen', 'wiki', 'ws'],
			'memberName': 'wikipedia',
			'description': 'Get info from a wikipedia page',
			'examples': ['wikipedia {thing}', 'wikipedia Discord'],
			'guildOnly': false,

			'args': [
				{
					'key': 'input',
					'prompt': 'What page do you want to get info from?',
					'type': 'string',
					'label': 'Article to find'
				}
			]
		});
	}

	run (msg, args) {
		superagent.get(
			`https://en.wikipedia.org/w/api.php?action=query&list=search&srwhat=text&srprop=sectionsnippet&format=json&srsearch=${args.input}`
		)
			.then(res => res.body.query.search)
			.then((results) => {
				if (!results[0]) {
					return Promise.reject(console.error('NO RESULTS')); // eslint-disable-line no-console
				}

				return results[0];
			})
			.then(result => superagent.get(
				`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(result.title)}`
			))
			.then(res => res.body.query.pages[Object.keys(res.body.query.pages)])
			.then((page) => {
				const url = `https://wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
					wikiData = {
						url,
						'pageTitle': page.title,
						'pageExtract': `${page.extract.substring(0, 500)}... [Read more](${url.replace(/\(/, '%28').replace(/\)/, '%29')})`
					};

				return wikiData;
			})
			.then((wikiData) => {
				const wikiEmbed = new Discord.MessageEmbed();

				wikiEmbed
					.setAuthor(`Wikipedia - ${wikiData.pageTitle}`, 'https://favna.s-ul.eu/dYdFA880')
					.setColor('#FF0000')
					.setFooter(`Wikipedia result pulled on ${moment().format('MMMM Do YYYY HH:mm:ss')}`)
					.setURL(wikiData.url)
					.setDescription(wikiData.pageExtract);
				msg.embed(wikiEmbed, wikiData.url);
			})
			.catch((err) => {
				console.error(err); // eslint-disable-line no-console

				return msg.reply('⚠ No results found');
			});
	}
};