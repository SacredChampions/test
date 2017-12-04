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
	cheerio = require('cheerio'),
	commando = require('discord.js-commando'),
	request = require('request');


module.exports = class embedCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'scp',
			'group': 'search',
			'memberName': 'scp',
			'description': 'Get an SCP from the SCP foundation website',
			'examples': ['scp {article-id}', 'scp 173'],
			'guildOnly': false,

			'args': [
				{
					'key': 'scparticle',
					'prompt': 'Please enter the SCP you\'d like an URL for.',
					'type': 'string',
					'label': 'Search query'
				}
			]
		});
	}

	run (msg, args) {
		msg.delete();
		const scpEmbed = new Discord.MessageEmbed();

		scpEmbed
			.setTitle(`SCP-${args.scparticle}`)
			.setFooter('SCP Foundation', 'https://ev1l0rd.s-ul.eu/uVu89Guq')
			.setURL(`http://www.scp-wiki.net/scp-${args.scparticle}`)
			.setColor('#362727');

		request({
			'uri': `http://www.scp-wiki.net/scp-${args.scparticle}`,
			'headers': {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'}
		},
		(err, resp, body) => {
			if (!err && resp.statusCode === 200) {
				const cheerioLoader = cheerio.load(body);

				scpEmbed
					.addField('Object Class', cheerioLoader('strong:contains("Object Class:")').parent()
						.text()
						.slice(14), false)
					.addField('Special Containment Procedures', `${cheerioLoader('strong:contains("Special Containment Procedures:")').parent()
						.text()
						.slice(32, 332)}... `, false)
					.addField('Description', `${cheerioLoader('strong:contains("Description:")').parent()
						.text()
						.slice(13, 313)}... [Read more](http://www.scp-wiki.net/scp-${args.scparticle})`, false);
			} else {
				return msg.reply('Request error occured and couldn\'t fill in article data');
			}

			return msg.embed(scpEmbed, `http://www.scp-wiki.net/scp-${args.scparticle}`);
		});
	}
};