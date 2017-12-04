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
	scalc = require('scalc');

module.exports = class mathCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'math',
			'aliases': ['calc'],
			'group': 'misc',
			'memberName': 'math',
			'description': 'Calculate anything',
			'examples': ['math {equation to solve}', 'math -10 - abs(-3) + 2^5'],
			'guildOnly': false,

			'args': [
				{
					'key': 'equation',
					'prompt': 'What is the equation to solve?',
					'type': 'string',
					'label': 'Equation to calculate'
				}
			]
		});
	}

	run (msg, args) {
		const mathEmbed = new Discord.MessageEmbed(); // eslint-disable-line one-var

		mathEmbed
			.setColor('#3eb0f2')
			.addField('Equation', args.equation.toString(), false)
			.addField('Result', scalc(args.equation), false);

		return msg.embed(mathEmbed);
	}
};