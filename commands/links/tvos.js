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

module.exports = class tvOSCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'tvos',
			'aliases': ['blockupdates'],
			'group': 'links',
			'memberName': 'tvos',
			'description': 'A link to download a tvos beta profile to block iOS updates',
			'guildOnly': false
		});
	}

	run (msg) {
		return msg.say('If you want to block getting OTA updates on your iOS device install the tvOS beta profile.' +
            'To download open this link in Safari: https://hikay.github.io/app/NOOTA.mobileconfig');
	}
};