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

const booru = require('booru'),
	commando = require('discord.js-commando');

module.exports = class e621Command extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'e621',
			'group': 'nsfw',
			'aliases': ['eee'],
			'memberName': 'e621',
			'description': 'Find NSFW Content on e621',
			'examples': ['e621 {NSFW Query}', 'e621 Pyrrha Nikos'],
			'guildOnly': false,
			'nsfw': true,

			'args': [
				{
					'key': 'nsfwtags',
					'prompt': 'What do you want to find NSFW for?',
					'type': 'string',
					'label': 'Search query'
				}
			]
		});
	}

	run (msg, args) {
		booru.search('e621', args.nsfwtags.split(' '), {
			'limit': 1,
			'random': true
		})
			.then(booru.commonfy)
			.then((images) => {
				msg.say(`Score: ${images[0].common.score}\nImage: ${images[0].common.file_url}`);
			})
			.catch((err) => {
				if (err.name === 'booruError') {
					console.error(err.message); // eslint-disable-line no-console

					return msg.reply('⚠ No juicy images found. An error was logged to your error console');
				}

				return msg.reply('⚠ No juicy images found.');
			});
	}
};