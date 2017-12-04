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

module.exports = class threeDSguideCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': '3dsguide',
			'aliases': ['plaiguide'],
			'group': 'links',
			'memberName': '3dsguide',
			'description': 'A link to plailect\'s Nintendo 3DS Guide',
			'guildOnly': false
		});
	}

	run (msg) {
		const plaiGuideEmbed = new Discord.MessageEmbed();

		plaiGuideEmbed
			.setColor('#FF0000')
			.setTitle('A one stop guide for (New) Nintendo 3DS (XL) / (New) Nintendo 2DS (XL)')
			.setDescription('Want to get Custom Firmware on your Nintendo 3DS? Need instructions on how to set up Boot9Strap, Luma3DS and other homebrew? Follow this guide')
			.addField('\u200b', 'https://3ds.guide')
			.setThumbnail('https://favna.s-ul.eu/d0bn8E0M.png');

		return msg.embed(plaiGuideEmbed, 'https://3ds.guide');
	}
};