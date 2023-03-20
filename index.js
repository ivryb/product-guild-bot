import { Bot } from 'grammy';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';

import { botNameC } from './store/script.js';

const { productsBotToken, guildBotToken, adminId, adminChatId, guildBotId, guildGeneralChatLink } = process.env;

import { guildSession } from './session.js';

import { setupWelcomeStage } from './stages/welcome.js';
import { setupGuildJoiningStage } from './stages/guildJoining.js';
import { setupGuildStart } from './stages/guildStart.js';

const bot = new Bot(guildBotToken);

bot.api.config.use(parseMode('HTML'));

bot.use(guildSession);
bot.use(hydrateReply);

setupWelcomeStage(bot);
setupGuildJoiningStage(bot);
setupGuildStart(bot, { guildGeneralChatLink });

bot.on(':file', async (ctx) => {
  console.log('New file', ctx.msg);
  await ctx.reply(`${botNameC} Дякую, друже! Я знайду як це застосувати...`);
});

bot.on(':media', async (ctx) => {
  console.log('New media', ctx.msg);
  await ctx.reply(`${botNameC} Дякую, друже! Я знайду як це застосувати...`);
});

bot.on('message', async (ctx) => {
  await ctx.reply(`${botNameC} Так, я тебе чую...`);
});

bot.start();