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

module.exports = class pspGuideCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'pspguide',
			'aliases': ['psp'],
			'group': 'links',
			'memberName': 'pspguide',
			'description': 'A link to the hackinformer PSP Guide',
			'guildOnly': false
		});
	}

	run (msg) {
		const pspGuideEmbed = new Discord.MessageEmbed();

		pspGuideEmbed
			.setColor('#FF0000')
			.setTitle('A one stop guide for PSP')
			.setDescription('Want to get Custom Firmware on your PSP? Need instructions on how to set up ProCFW? Follow this guide')
			.addField('\u200b', 'https://psp.guide')
			.setThumbnail('https://silento.s-ul.eu/YlvnMCOl');

		return msg.embed(pspGuideEmbed, 'https://psp.guide');
	}
};