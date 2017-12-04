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

module.exports = class vitaGuideCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'vitaguide',
			'aliases': ['henkaku', 'molecule'],
			'group': 'links',
			'memberName': 'vitaguide',
			'description': 'A link to a PSVita Hacking Guide',
			'guildOnly': false
		});
	}

	run (msg) {
		const vitaGuideEmbed = new Discord.MessageEmbed();

		vitaGuideEmbed
			.setColor('#FF0000')
			.setTitle('A one stop guide for PSVita')
			.setDescription('Want to run game backups on your PSVita? Need instructions on how to set up Henkaku? Go here!')
			.addField('\u200b', 'http://cfw.guide/vita/')
			.setThumbnail('https://silento.s-ul.eu/PIKf4IQR');

		return msg.embed(vitaGuideEmbed, 'http://cfw.guide/vita/');
	}
};