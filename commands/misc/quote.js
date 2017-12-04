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

module.exports = class quoteCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'quote',
			'group': 'misc',
			'aliases': ['quoter', 'q'],
			'memberName': 'quote',
			'description': 'Quote someone else\'s message into a MessageEmbed. Limited to same server, see xquote for cross server.',
			'examples': ['quote {channel name or ID} {messageID} {content you want to send along with the embed}', 'quote base 355275528002994176 Oh so that was the first message on the channel!'],
			'guildOnly': false,

			'args': [
				{
					'key': 'channel',
					'prompt': 'Which channel from the server?',
					'type': 'channel',
					'label': 'Channel name or ID'
				},
				{
					'key': 'message',
					'prompt': 'And what message?',
					'type': 'string',
					'label': 'MessageID to quote'
				},
				{
					'key': 'content',
					'prompt': 'What content would you like to send along with the quote?',
					'type': 'string',
					'default': '',
					'label': 'Content to send along with your quote'
				}
			]
		});
	}

	run (msg, args) {

		msg.guild.channels.get(args.channel.id).messages
			.fetch(args.message)
			.then((quote) => {

				const quoteEmbed = new Discord.MessageEmbed();

				if (quote.member === null) {
					quoteEmbed
						.setAuthor(`Quoting ${quote.author.username}`, quote.author.displayAvatarURL())
						.setColor('#FF0000');
				} else {
					quoteEmbed
						.setAuthor(`Quoting ${quote.member.displayName}`, quote.author.displayAvatarURL())
						.setColor(quote.channel.type === 'text' ? quote.member.displayHexColor : '#FF0000');
				}
				quoteEmbed
					.setFooter(`Message sent in #${quote.channel.name} on ${moment(quote.createdAt).format('MMMM Do YYYY [at] HH:mm')}`)
					.setDescription(quote.cleanContent);


				if (quote.attachments.first()) {
					const fileExt = quote.attachments.first().url.slice(-3); // eslint-disable-line one-var

					if (fileExt === 'peg' || fileExt === 'jpg' || fileExt === 'png' || fileExt === 'gif' || fileExt === 'webp') {
						quoteEmbed.setImage(quote.attachments.first().url);
					}
				}

				msg.delete();

				return msg.embed(quoteEmbed, args.content);
			})
			.catch((err) => {
				console.error(err); // eslint-disable-line no-console

				return msg.reply('Something went wrong. An error was logged to your error console.');
			});
	}
};