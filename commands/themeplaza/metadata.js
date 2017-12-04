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

const MetaDataObject = {
	'nsfw': {
		'0': 'safe',
		'1': 'sketchy',
		'2': 'nsfw'
	},
	'bgm': {
		'1': 'Yes',
		'2': 'No'
	},
	'top_draw_type': {
		'0': 'None',
		'1': 'Solid color',
		'2': 'Solid color with textured squares',
		'3': 'Texture'
	},
	'top_frame_type': {
		'0': 'Regular Scrolling Speed',
		'1': 'No Scroll',
		'3': 'Slow Scrolling Speed'
	},
	'bottom_draw_type': {
		'0': 'None',
		'1': 'Solid color',
		'2': 'Invalid',
		'3': 'Texture'
	},
	'bottom_frame_type': {
		'0': 'Regular Scrolling Speed',
		'1': 'No Scroll',
		'2': 'Flipbook Scroll (0 > 1 > 2 > 0)',
		'3': 'Slow Scrolling Speed',
		'4': 'Flipbook Scroll (0 > 1 > 2 > 1 > 0)'
	},
	'custom_cursor': {
		'0': 'No',
		'1': 'Yes'
	},
	'custom_folder': {
		'0': 'No',
		'1': 'Yes'
	},
	'custom_cart': {
		'0': 'No',
		'1': 'Yes'
	},
	'custom_sfx': {
		'0': 'No',
		'1': 'Yes'
	}
};

module.exports = {MetaDataObject};