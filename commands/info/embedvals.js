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

module.exports = class embedValsCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'embedvals',
			'aliases': ['valsofembed', 'vals'],
			'group': 'info',
			'memberName': 'embedvals',
			'description': 'Shows how a Discord MessageEmbed is build up',
			'guildOnly': false
		});
	}

	run (msg) {
		const valsOfEmbed = new Discord.MessageEmbed();

		valsOfEmbed
			.setAuthor('This is the author', 'https://i.imgur.com/cgr5eSk.png')
			.setColor('#ffffff')
			.setDescription('This is the description')
			.setFooter('This is the footer', 'https://i.imgur.com/kPNjOuJ.png')
			.setImage('https://i.imgur.com/l32vg3M.png')
			.setThumbnail('https://i.imgur.com/IQVvBcn.png')
			.setTimestamp()
			.setTitle('This is the title')
			.setURL('https://www.google.com')
			.addField('FieldName', 'FieldValue', true);
		msg.embed(valsOfEmbed);
	}
};