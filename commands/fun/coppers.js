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


const commando = require('discord.js-commando');

module.exports = class coppersCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'coppers',
			'aliases': ['police', 'cops'],
			'group': 'fun',
			'memberName': 'coppers',
			'description': 'Sends a "Police you are surrounded" message',
			'examples': ['coppers'],
			'guildOnly': false
		});
	}

	run (msg) {
		msg.delete();
		msg.say(':rotating_light: :rotating_light: WEE WOO WEE WOO - PUT YOUR HANDS IN THE AIR, YOU ARE SURROUNDED :rotating_light: :rotating_light:\n\n' +
         ':oncoming_police_car:  <:police:346089253572313088> <:police:346089253572313088> <:police:346089253572313088>  :oncoming_police_car:');
	}
};