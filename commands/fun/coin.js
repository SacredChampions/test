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
	coin = require('flipacoin'),
	commando = require('discord.js-commando');


module.exports = class coinCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'coin',
			'group': 'fun',
			'aliases': ['flip'],
			'memberName': 'coin',
			'description': 'Flips a coin',
			'examples': ['flip'],
			'guildOnly': false
		});
	}

	run (msg) {
		const coinEmbed = new Discord.MessageEmbed(),
			res = coin();

		coinEmbed
			.setColor('#FF0000')
			.setImage(res === 'head' ? 'https://favna.s-ul.eu/8ZKmpiKO.png' : 'https://favna.s-ul.eu/NTsDbSUo.png')
			.setTitle(`Flipped ${res}s`);

		msg.embed(coinEmbed);
	}
};