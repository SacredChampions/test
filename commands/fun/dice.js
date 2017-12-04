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
	xdicey = require('xdicey');

module.exports = class diceCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dice',
			'aliases': ['xdicey', 'roll', 'dicey', 'die'],
			'group': 'fun',
			'memberName': 'dice',
			'description': 'Sends contents of a copypasta file to the chat',
			'examples': ['dice <sides_on_die> <amount_of_rolls>', 'dice 6 5'],
			'guildOnly': false,

			'args': [
				{
					'key': 'sides',
					'prompt': 'How many sides does your die have?',
					'type': 'integer',
					'label': 'Amount of sides the dice have'
				}, {
					'key': 'rolls',
					'prompt': 'How many times should the die be rolled?',
					'type': 'integer',
					'label': 'The amount of times the die is rolled'
				}
			]
		});
	}

	run (msg, args) {
		const diceEmbed = new Discord.MessageEmbed(),
			res = [],
			throwDice = xdicey(args.rolls, args.sides);


		for (const index in throwDice.individual) { // eslint-disable-line guard-for-in
			res.push(`🎲: ${throwDice.individual[index]}`);
		}


		diceEmbed
			.setColor('#EA596E')
			.addField('Dice result', res, false)
			.addField('Total', throwDice.total, false);

		return msg.embed(diceEmbed);
	}
};