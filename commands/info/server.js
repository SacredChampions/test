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
	moment = require('moment');


const contentFilter = ['Content filter disabled', 'Scan messages of members without a role', 'Scan messages sent by all members'], // eslint-disable-line one-var
	verificationLevel = ['None - unrestricted', 'Low - must have verified email on account', 'Medium - must be registered on Discord for longer than 5 minutes', 'High - 	(╯°□°）╯︵ ┻━┻ - must be a member of the server for longer than 10 minutes', 'Very High - ┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻ - must have a verified phone number']; // eslint-disable-line max-len

module.exports = class serverInfoCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'server',
			'aliases': ['serverinfo', 'sinfo'],
			'group': 'info',
			'memberName': 'server',
			'description': 'Gets information about the server.',
			'examples': ['server {serverName ID (partial or full)}', 'server Favna\'s Selfbot'],
			'guildOnly': false,

			'args': [
				{
					'key': 'server',
					'prompt': 'Get info from which server?',
					'type': 'guild',
					'default': 'current',
					'label': 'serverName ID (partial or full)'
				}
			]
		});
	}

	run (msg, args) {
		if (msg.channel.type !== 'text' && args.server === 'current') {
			return msg.reply('An argument of server name (partial or full) or server ID is required when talking outside of a server');
		}

		const guild = args.server === 'current' ? msg.guild : args.server,
			channels = guild.channels.map(ty => ty.type), // eslint-disable-line sort-vars
			presences = guild.presences.map(st => st.status),
			serverEmbed = new Discord.MessageEmbed();


		let guildChannels = 0,
			onlineMembers = 0;


		for (const i in presences) {
			if (presences[i] !== 'offline') {
				onlineMembers += 1;
			}
		}
		for (const i in channels) {
			if (channels[i] === 'text') {
				guildChannels += 1;
			}
		}

		serverEmbed
			.setColor(guild.owner.displayHexColor)
			.setAuthor('Server Info', 'https://favna.s-ul.eu/O0qc0yt7.png')
			.setThumbnail(msg.guild.iconURL({'format': 'png'}))
			.setFooter(`Server ID: ${guild.id}`)
			.addField('Server Name', guild.name, true)
			.addField('Owner', guild.owner.user.tag, true)
			.addField('Members', guild.memberCount, true)
			.addField('Currently Online', onlineMembers, true)
			.addField('Region', guild.region, true)
			.addField('Highest Role', guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name, true)
			.addField('Number of emojis', guild.emojis.size, true)
			.addField('Number of roles', guild.roles.size, true)
			.addField('Number of channels', guildChannels, true)
			.addField('Created At', moment(guild.createdTimestamp).format('MMMM Do YYYY [@] HH:mm:ss [UTC]Z'), false)
			.addField('Verification Level', verificationLevel[guild.verificationLevel], false)
			.addField('Explicit Content Filter', contentFilter[`${guild.explicitContentFilter}`], false);

		guild.splashURL() !== null ? serverEmbed.setImage(guild.splashURL()) : null;
		
		return msg.embed(serverEmbed);
	}
};