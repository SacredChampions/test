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

const commando = require('discord.js-commando'),
	data = require('../../data.json');

const VALID_TYPES = ['PLAYING', 'STREAMING', 'WATCHING', 'LISTENING']; // eslint-disable-line one-var

module.exports = class timeresetCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'timereset',
			'group': 'status',
			'aliases': ['tr'],
			'memberName': 'timereset',
			'description': 'Resets the RichPresence timer',
			'examples': ['timereset'],
			'guildOnly': false
		});
	}

	run () {
		this.client.user.setPresence({
			'activity': {
				'application': data.richpresenceData.application !== '' ? data.richpresenceData.application : '355326429178757131',
				'name': data.richpresenceData.name !== '' ? data.richpresenceData.name : 'Discord-Self-Bot',
				'type': VALID_TYPES.includes(data.richpresenceData.type) ? data.richpresenceData.type : 'WATCHING',
				'url': data.richpresenceData.url !== '' ? data.richpresenceData.url : null,
				'details': data.richpresenceData.details !== '' ? data.richpresenceData.details : 'Made by Favna',
				'state': data.richpresenceData.state !== '' ? data.richpresenceData.state : 'https://selfbot.favna.xyz',
				'timestamps': {'start': data.richpresenceData.timestamp ? Math.floor(Date.now() / 1000) : null},
				'assets': {
					'largeImage': data.richpresenceData.largeImage !== '' ? data.richpresenceData.largeImage : '379734851206512640',
					'smallImage': data.richpresenceData.smallImage !== '' ? data.richpresenceData.smallImage : '379734813751377921',
					'largeText': data.richpresenceData.largeText !== '' ? data.richpresenceData.largeText : 'See the website',
					'smallText': data.richpresenceData.smallText !== '' ? data.richpresenceData.smallText : 'Or the GitHub'
				},
				'party': {
					'size': [
						data.richpresenceData.partySize.current !== 0
							? data.richpresenceData.partySize.current
							: 1,
						data.richpresenceData.partySize.max !== 0
							? data.richpresenceData.partySize.max : 1
					]
				}
			}
		});
	}
};