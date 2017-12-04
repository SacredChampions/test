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
	moment = require('moment');

module.exports = class fyidmCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'fyidm',
			'group': 'info',
			'aliases': ['dm', 'discmatch', 'dmatch'],
			'memberName': 'fyidm',
			'description': 'Returns a list of users who have the same discriminator (the 4 digits after the username) as you. fyidm is short for "Find your ID Mate"',
			'examples': ['fyidm {4 digit discriminator}', 'fyidm 0000'],
			'guildOnly': false,

			'args': [
				{
					'key': 'discrim',
					'prompt': 'Check which discriminator',
					'type': 'string',
					'default': 'self',
					'max': 4,
					'min': 4,
					'label': 'The custom input discriminator',
					'validate': (id) => {
						if (id.length === 4) {
							return true;
						}
					
						return 'The length of the ID is exactly 4 digits long';
					}
				}
			]
		});
	}

	run (msg, args) {
		const discrim = args.discrim === 'self' ? msg.author.discriminator : args.discrim,
			discrimMatches = this.client.users.filter(u => u.discriminator === discrim),
			fyidmEmbed = new Discord.MessageEmbed();
		let matchEntries = {};

		discrimMatches.delete(msg.author.id);
		matchEntries = discrimMatches.entries();

		fyidmEmbed
			.setColor('#FF0000')
			.setTitle('Uses with matching discriminator')
			.setFooter(`Discriminator match checked on ${moment().format('MMMM Do YYYY HH:mm:ss')}`);

		for (let index = 0; index < discrimMatches.size; index += 1) {
			const match = matchEntries.next().value[1];

			if (discrimMatches.size <= 8) {
				fyidmEmbed
					.addField('Username', match.username, true)
					.addField('Discriminator', match.discriminator, true)
					.addField('UserID', match.id, true);
			} else {
				fyidmEmbed.addField('Username || Discriminator || UserID', `${match.username} || ${match.discriminator} || ${match.id}`, false);
			}
		}

		msg.embed(fyidmEmbed);
	}
};