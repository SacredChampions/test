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

const Commando = require('discord.js-commando'),
	Discord = require('discord.js'),
	path = require('path'),
	auth = require(path.join(`${__dirname}/auth.json`)), // eslint-disable-line sort-vars
	data = require(path.join(`${__dirname}/data.json`)), // eslint-disable-line sort-vars
	moment = require('moment'), // eslint-disable-line sort-vars
	{oneLine} = require('common-tags'),
	sqlite = require('sqlite');
const nub{
if(auth.webhookID === "ID_here" && auth.webhooktoken == "TOKEN_HERE"){
	'webid': process.env.webhookID,
	'webto': process.env.webhooktoken	
	}
}
// eslint-disable-next-line one-var
const values = {
	'hookClient': new Discord.WebhookClient(nub.webid, nub.webto, {'disableEveryone': true}),
	'ownerID': auth.ownerID,
	'validTypes': ['PLAYING', 'STREAMING', 'WATCHING', 'LISTENING']
};

class DiscordSelfBot {
	constructor (token) { // eslint-disable-line no-unused-vars
		this.bootTime = new Date();
		this.token = auth.token;
		this.client = new Commando.Client({
			'owner': values.ownerID,
			'commandPrefix': 'o!',
			'selfbot': true
		});
		this.isReady = false;
	}

	onReady () {
		return () => {
			console.log(`Client ready; logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`); // eslint-disable-line no-console
			this.client.user.setAFK(true); // Set bot to AFK to enable mobile notifications

			if (!data.richPresenceEnabled) {
				this.client.user.setPresence({
					'activity': {
						'name': data.richpresenceData.name !== '' ? data.richpresenceData.name : 'Discord-Self-Bot',
						'type': values.validTypes.includes(data.richpresenceData.type) ? data.richpresenceData.type : 'PLAYING',
						'url': data.richpresenceData.url !== '' ? data.richpresenceData.url : null
					}
				});
			} else {
				this.client.user.setPresence({
					'activity': {
						'application': data.richpresenceData.application !== '' ? data.richpresenceData.application : '355326429178757131',
						'name': data.richpresenceData.name !== '' ? data.richpresenceData.name : 'Discord-Self-Bot',
						'type': values.validTypes.includes(data.richpresenceData.type) ? data.richpresenceData.type : 'WATCHING',
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
						'party': {'size': [data.richpresenceData.partySize.current, data.richpresenceData.partySize.max]}
					}
				});
			}

			this.isReady = true;
		};
	}

	onCommandPrefixChange () {
		return (guild, prefix) => {
			// eslint-disable-next-line no-console
			console.log(oneLine `
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
		};
	}

	onDisconnect () {
		return () => {
			console.warn('Disconnected!'); // eslint-disable-line no-console
		};

	}

	onReconnect () {
		return () => {
			console.warn('Reconnecting...'); // eslint-disable-line no-console
		};
	}

	onCmdErr () {
		return (cmd, err) => {
			if (err instanceof Commando.FriendlyError) {
				return;
			}
			console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err); // eslint-disable-line no-console
		};
	}

	onCmdBlock () {
		return (msg, reason) => {
			// eslint-disable-next-line no-console
			console.log(oneLine `
		Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
		blocked; ${reason}
	`);
		};
	}

	onCmdStatusChange () {
		return (guild, command, enabled) => {
			// eslint-disable-next-line no-console
			console.log(oneLine `
            Command ${command.groupID}:${command.memberName}
            ${enabled ? 'enabled' : 'disabled'}
            ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
        `);
		};
	}

	onGroupStatusChange () {
		return (guild, group, enabled) => {
			// eslint-disable-next-line no-console
			console.log(oneLine `
            Group ${group.id}
            ${enabled ? 'enabled' : 'disabled'}
            ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
        `);
		};
	}

	onmessage () {
		return (msg) => {

			if (data.webhookNotifiers && msg.author.id !== values.ownerID && !msg.mentions.users.get(values.ownerID)) {
				const mentionEmbed = new Discord.MessageEmbed(),
					regexpKeywords = [];

				for (let i = 0; i < data.webhookData.keywords.length; i += 1) {
					const regex = new RegExp(`.*${data.webhookData.keywords[i]}.*`);

					regexpKeywords.push(regex);
				}

				if (regexpKeywords.some(rx => rx.test(msg.cleanContent.split(' ')))) {
					mentionEmbed
						.setAuthor(msg.channel.type === 'text'
							? `${msg.member.displayName} dropped your name in #${msg.channel.name} in ${msg.guild.name}`
							: `${msg.author.username} sent a message with your name`, msg.author.displayAvatarURL())
						.setFooter(`Message dates from ${moment(msg.createdAt).format('MMMM Do YYYY | HH:mm:ss')}`)
						.setColor(msg.channel.type === 'text' ? msg.member.displayHexColor : '#535B62')
						.setThumbnail(msg.author.displayAvatarURL())
						.addField('Message Content', msg.cleanContent.length > 1024 ? msg.cleanContent.slice(0, 1024) : msg.cleanContent)
						.addField('Message Attachments', msg.attachments.first() && msg.attachments.first().url ? msg.attachments.map(au => au.url) : 'None');

					values.hookClient.send(`Stalkify away <@${values.ownerID}>`, {'embeds': [mentionEmbed]}).catch(console.error); // eslint-disable-line no-console
				}
			}
		};
	}

	init () {
		this.client
			.on('ready', this.onReady())
			.on('commandPrefixChange', this.onCommandPrefixChange())
			.on('error', console.error) // eslint-disable-line no-console
			.on('warn', console.warn) // eslint-disable-line no-console
			.on('debug', console.log) // eslint-disable-line no-console
			.on('disconnect', this.onDisconnect())
			.on('reconnecting', this.onReconnect())
			.on('commandError', this.onCmdErr())
			.on('commandBlocked', this.onCmdBlock())
			.on('commandStatusChange', this.onCmdStatusChange())
			.on('groupStatusChange', this.onGroupStatusChange());

		data.webhookNotifiers ? this.client.on('message', this.onmessage()) : null;

		this.client.setProvider(
			sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
		).catch(console.error); // eslint-disable-line no-console

		this.client.registry
			.registerGroups([
				['info', 'Information Commands'],
				['search', 'Web Searching Commands'],
				['fun', 'Fun and Games Commands'],
				['misc', 'Miscellanious Commands'],
				['pokedex', 'PokéDex Lookup Commands'],
				['links', 'Quick Website Links'],
				['memes', 'React with meme images'],
				['status', 'Status setting commands'],
				['themeplaza', 'Various commands to browse ThemePlaza'],
				['emojis', '"Global" emojis as images'],
				['nsfw', 'NSFW finding commands']
			])
			.registerDefaultGroups()
			.registerDefaultTypes()
			.registerDefaultCommands({
				'help': true,
				'prefix': true,
				'ping': true,
				'eval_': true,
				'commandState': true
			})
			.registerCommandsIn(path.join(__dirname, 'commands'));

		return this.client.login(this.token);
	}

	deinit () {
		this.isReady = false;

		return this.client.destroy();
	}
}

module.exports = DiscordSelfBot;
