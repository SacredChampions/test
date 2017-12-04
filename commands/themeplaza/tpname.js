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
	cheerio = require('cheerio'),
	commando = require('discord.js-commando'),
	moment = require('moment'),
	path = require('path'),
	request = require('request'),
	mdobj = require(path.join(__dirname, 'metadata.js')).MetaDataObject; // eslint-disable-line sort-vars

const themeEmbed = new Discord.MessageEmbed(); // eslint-disable-line one-var

module.exports = class themeNameCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'tpname',
			'group': 'themeplaza',
			'aliases': ['themename', 'name', 'tname', 'tsearch', 'ts'],
			'memberName': 'tpname',
			'description': 'Get info from a theme on themeplaza based on search query',
			'examples': ['tname {search query}', 'name megaman'],
			'guildOnly': false,

			'args': [
				{
					'key': 'themeSQ',
					'prompt': 'Search query to fire at ThemePlaza?',
					'type': 'string',
					'label': 'Search query to fire on the site'
				}
			]
		});
	}

	run (msg, args) {
		const searchURL = `https://themeplaza.eu/themes?query=${args.themeSQ}&sort=newest`;

		request({
			'uri': searchURL,
			'headers': {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'}
		},
		(err, resp, body) => {
			if (!err && resp.statusCode === 200) {
				const themeFindLoader = cheerio.load(body),
					themeID = themeFindLoader('div.theme-grid.row.justify-content-center > div:nth-child(1) > div > div.card-header > a').attr('href')
						.slice(6),
					themeURL = `https://themeplaza.eu/api/v0/theme_lookup?item_id=${themeID}`;

				request({
					'uri': themeURL,
					'headers': {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'}
				},
				(error, response, result) => {
					if (!error && response.statusCode === 200) {
						const cheerioLoader = cheerio.load(result),
							themeData = JSON.parse(cheerioLoader('body').text());

						themeEmbed
							.setColor('#FF0000')
							.setTitle(themeData.title)
							.setURL(`https://themeplaza.eu/item/${args.themeID}`)
							.setThumbnail(`https://themeplaza.eu/download/${args.themeID}/qr`)
							.setDescription(themeData.description)
							.addField('Uploader', themeData.author, true)
							.addField('Upload Date', moment(themeData.upload_data).format('MMMM Do YYYY'), true)
							.addField('Amount of downloads', `${themeData.download_count}`, true)
							.addField('Amount of likes', `${themeData.likes}`, true)
							.addField('NSFW Level', mdobj.nsfw[themeData.nsfw], true)
							.addField('Custom BGM', mdobj.bgm[themeData.metadata.enable_bgm] ? mdobj.bgm[themeData.metadata.enable_bgm] : mdobj.bgm[2], true)
							.addField('Top Screen Draw Type', mdobj.top_draw_type[themeData.metadata.top_draw_type], true)
							.addField('Top Scroll', mdobj.top_frame_type[themeData.metadata.top_frame_type] ? mdobj.top_frame_type[themeData.metadata.top_frame_type] : mdobj.top_frame_type[1], true)
							.addField('Bottom Screen Draw Type', mdobj.bottom_draw_type[themeData.metadata.bottom_draw_type], true)
							.addField('Bottom Scroll', mdobj.bottom_frame_type[themeData.metadata.bottom_frame_type]
								? mdobj.bottom_frame_type[themeData.metadata.bottom_frame_type]
								: mdobj.bottom_frame_type[1], true)
							.addField('Custom Cursor', mdobj.custom_cursor[themeData.metadata.custom_cursor], true)
							.addField('Custom Folder Icon', mdobj.custom_folder[themeData.metadata.custom_folder], true)
							.addField('Custom  Cart Icon', mdobj.custom_cart[themeData.metadata.custom_cart], true)
							.addField('Custom SFX', mdobj.custom_sfx[themeData.metadata.custom_sfx], true)
							.addField('Custom BGM', themeData.metadata.enable_bgm === 1 ? themeData.metadata.bgm_info : 'None', false)
							.addField('Tags', themeData.tags.join(', '), false);

						themeData.nsfw === '0' ? themeEmbed.setImage(`https://themeplaza.eu/download/${args.themeID}/preview`) : null;
						msg.channel.nsfw ? themeEmbed.setImage(`https://themeplaza.eu/download/${args.themeID}/preview`) : null;

						return msg.embed(themeEmbed, `https://themeplaza.eu/item/${themeID}`);
					} 

					return msg.reply('An error occured, probably means the theme does not exist.');
                            
				});
			}
		}
		);
	}
};