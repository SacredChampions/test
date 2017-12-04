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
	path = require('path');

module.exports = class memeCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'meme',
			'aliases': ['mem', 'maymay'],
			'group': 'memes',
			'memberName': 'meme',
			'description': 'Send a meme image',
			'examples': ['meme {imageName}', 'meme cry'],
			'guildOnly': false,

			'args': [
				{
					'key': 'image',
					'prompt': 'What image do you want send?',
					'type': 'string',
					'label': 'image name to send'
				}
			]
		});
	}

	run (msg, args) {
		msg.channel.send({'files': [new Discord.MessageAttachment(path.join(__dirname, `/images/${args.image.toLowerCase()}.jpg`), `${args.image}Meme.jpg`)]});
		msg.delete();
	}
};