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
	cydia = require('cydia-api-node');

module.exports = class cydiaCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'cydia',
			'group': 'search',
			'aliases': ['cy'],
			'memberName': 'cydia',
			'description': 'Finds info on a Cydia package',
			'examples': ['cydia {packageName}', 'cydia anemone'],
			'guildOnly': false,

			'args': [
				{
					'key': 'packageName',
					'prompt': 'Please supply package name',
					'type': 'string',
					'label': 'Package name to look up'
				}
			]
		});
	}

	run (msg, args) {
		cydia.getAllInfo(args.packageName).then((res) => {
			if (res === false) {
				return msg.say(`**Tweak/Theme \`${args.packageName}\` not found!**`);
			}

			const cydiaEmbed = new Discord.MessageEmbed();

			cydiaEmbed
				.setColor('#5D2E1F')
				.setAuthor('Tweak Info', 'http://i.imgur.com/OPZfdht.png')
				.addField('Display Name', res.display, true)
				.addField('Package Name', res.name, true)
				.addField('Description', res.summary, true)
				.addField('Version', res.version, true)
				.addField('Section', res.section, true)
				.addField('Price', res.price === 0 ? 'Free' : res.price, true)
				.addField('Link', `[Click Here](http://cydia.saurik.com/package/${res.name})`, true)
				.addField('Repo', `[${res.repo.name}](https://cydia.saurik.com/api/share#?source=${res.repo.link})`, true);

			return msg.embed(cydiaEmbed);
		});
	}
};