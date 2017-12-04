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
	commando = require('discord.js-commando');

module.exports = class infoCommnad extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'info',
			'aliases': ['shill', 'plug'],
			'group': 'links',
			'memberName': 'info',
			'description': 'Link to Favna\'s discord-self-bot',
			'examples': ['info'],
			'guildOnly': false
		});
	}

	run (msg) {
		const shillEmbed = new Discord.MessageEmbed();

		shillEmbed
			.setTitle('Discord-Self-Bot by Favna')
			.setDescription('Empower your Discord experience with a fully modular and expansive set of commands')
			.setThumbnail('https://selfbot.favna.xyz/images/selfbot.png')
			.setURL('https://selfbot.favna.xyz')
			.addField('​', '[Website](https://selfbot.favna.xyz) | [GitHub](https://github.com/Favna/Discord-Self-Bot) | [Wiki](https://github.com/Favna/Discord-Self-Bot/wiki)');

		return msg.embed(shillEmbed, 'Find information on the bot here https://selfbot.favna.xyz');
	}
};