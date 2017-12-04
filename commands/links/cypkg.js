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

module.exports = class cydiaPackageCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'cypkg',
			'aliases': ['pkg'],
			'group': 'links',
			'memberName': 'cypkg',
			'description': 'Gets the link to a cydia package using the Cydia Share URL API',
			'examples': ['cypkg {repo_url} {package_name}', 'cypkg http://apt.thebigboss.org/repofiles/cydia/ com.anemonetheming.anemone'],
			'guildOnly': false,

			'args': [
				{
					'key': 'repo',
					'prompt': 'What is the repo URL?',
					'type': 'string',
					'label': 'URL of the repo'
				},
				{
					'key': 'package',
					'prompt': 'And what is the package name?',
					'type': 'string',
					'label': 'PackageName of the package'
				}
			]
		});
	}

	run (msg, args) {
		return msg.say(`To find this package on Cydia follow this URL: https://cydia.saurik.com/api/share#?source=${args.repo}/&package=${args.package}`);
	}
};