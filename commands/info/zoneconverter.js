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
	moment = require('moment-timezone');

module.exports = class zoneConvCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'zoneconverter',
			'aliases': ['time', 'conv', 'zone', 'timeconv'],
			'group': 'info',
			'memberName': 'zoneconverter',
			'description': 'Converts current time to specified timezone',
			'examples': ['zoneconverter {Time in 24hourformat}  {Timezone in TZ}', 'zoneconverter 18:00 America/New_York'],
			'guildOnly': false,

			'args': [
				{
					'key': 'time',
					'prompt': 'What time to convert? (24 hour format)',
					'type': 'string',
					'label': 'Time in 24h format'
				},
				{
					'key': 'zone',
					'prompt': 'What timezone to convert to?',
					'type': 'string',
					'label': 'timezone to convert to'
				}
			]
		});
	}

	run (msg, args) {
		const convertedTime = moment(`${moment().format('YYYY-MM-DD')} ${args.time}`).tz(args.zone)
			.format('MMMM Do | HH:mm');


		if (convertedTime.split(' | ')[1] === args.time) {
			return msg.say('***The provided timezone either does not exist or has the same time as your own.\n' +
                'For the list of correct timezones see this table: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>***');
		}

		return msg.say(`***When it is ${args.time} in ${moment.tz.guess()} it will be ${convertedTime} in ${args.zone}***`);

	}
};