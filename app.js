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

/* eslint-disable no-mixed-requires, sort-vars */

const Path = require('path'),
	DiscordSelfBot = require(Path.join(__dirname, 'DiscordSelfBot.js')),
	keys = require('./auth.json'),
	start = function () {
		token = process.env.TOKEN
		new DiscordSelfBot(token).init();
	};

start();
