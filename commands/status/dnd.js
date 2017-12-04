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

module.exports = class dndCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dnd',
			'group': 'status',
			'aliases': ['busy', 'red'],
			'memberName': 'dnd',
			'description': 'Set your status to Do Not Disturb',
			'examples': ['dnd'],
			'guildOnly': false
		});
	}

	run (msg) {
		this.client.user.setPresence({'status': 'dnd'}).then(msg.reply('Status set to do not disturb'));
	}
};