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

const validTypes = ['PLAYING', 'STREAMING', 'WATCHING', 'LISTENING']; // eslint-disable-line one-var

module.exports = class activityCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'activity',
			'group': 'status',
			'aliases': ['act'],
			'memberName': 'activity',
			'description': 'Sets your RichPresence data',
			'examples': ['activity {name} {type} {details} {state} {timestamp} {largeimage} {smallimage} {largetext} {smalltext} {partycurrent} {partymax} {url}'],
			'guildOnly': false,

			'args': [
				{
					'key': 'activityName',
					'prompt': 'Name of the activity?',
					'type': 'string',
					'label': 'Name of the activity to set'
				},
				{
					'key': 'type',
					'prompt': 'Type of the activity?',
					'type': 'string',
					'label': 'Type of the activity to set',
					'parse': type => type.toUpperCase(),
					'validate': (type) => {
						if (validTypes.includes(type.toUpperCase())) {
							return true;
						}

						return 'Type has to be one of: "PLAYING", "STREAMING", "WATCHING" or "LISTENING"';
					}
				},
				{
					'key': 'details',
					'prompt': 'Details of activity?',
					'type': 'string',
					'label': 'Details of the activity to set'
				},
				{
					'key': 'state',
					'prompt': 'State of the activity?',
					'type': 'string',
					'label': 'State of the activity to set'
				},
				{
					'key': 'timestamp',
					'prompt': 'Include a timestamp?',
					'type': 'boolean',
					'label': 'Whether a timestamp is included in the activity',
					'validate': (bool) => {
						const validBools = ['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+', 'false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-'];

						if (validBools.includes(bool)) {
							return true;
						}

						return `Has to be one of ${validBools.join(', ')}`;
					}
				},
				{
					'key': 'largeimage',
					'prompt': 'Large Image ID to set?',
					'type': 'string',
					'label': 'the Large Image to use for the activity',
					'validate': (limgid) => {
						if (limgid.length === 18) {
							return true;
						}

						return 'Large Image ID is 18 digits long';
					}
				},
				{
					'key': 'smallimage',
					'prompt': 'Small Image ID to set?',
					'type': 'string',
					'label': 'the Small Image to use for the activity',
					'validate': (simgid) => {
						if (simgid.length === 18) {
							return true;
						}

						return 'Small Image ID is 18 digits long';
					}
				},
				{
					'key': 'largetext',
					'prompt': 'The large text to set? ("none" to skip)',
					'type': 'string',
					'label': 'The Large Image Text to use for the activity (set "none" if skipping)'
				},
				{
					'key': 'smalltext',
					'prompt': 'The small text to set? ("none" to skip)',
					'type': 'string',
					'label': 'The Small Image Text to use for the activity (set "none" if skipping)'
				},
				{
					'key': 'partycurrent',
					'prompt': 'Current members in the party? ("0" to skip)',
					'type': 'integer',
					'label': 'The current amount of party members for the activity (set "0" if skipping)'
				},
				{
					'key': 'partymax',
					'prompt': 'Maximum members in the party? ("0" to skip)',
					'type': 'integer',
					'label': 'The maximum amount of party members for the activity (set "0" if skipping)'
				},
				{
					'key': 'url',
					'prompt': 'The URL to set if type=STREAMING ("none" to skip)',
					'type': 'string',
					'label': 'The url to use for the activity (set "none" if skipping)'
				}
			]
		});
	}

	run (msg, args) {
		this.client.user.setPresence({
			'activity': {
				'application': data.richpresenceData.application,
				'name': args.activityName,
				'type': args.type,
				'url': args.url !== 'none' ? args.url : null,
				'details': args.details,
				'state': args.state,
				'timestamps': {'start': args.timestamps ? Math.floor(Date.now() / 1000) : null},
				'assets': {
					'largeImage': args.largeimage,
					'smallImage': args.smallimage,
					'largeText': args.largetext !== 'none' ? args.largetext : null,
					'smallText': args.smalltext !== 'none' ? args.smalltext : null
				},
				'party': {'size': [args.partycurrent, args.partymax]}

			}
		});

		return msg.reply('Your activity should be changed. Keep in mind that you cannot see it on your own account and it may take a little while before your change is visisble due to caching.');
	}
};