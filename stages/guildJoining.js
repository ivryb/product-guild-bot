import { InlineKeyboard } from 'grammy';
import { Menu } from '@grammyjs/menu';

import { getArticleStatus, setArticleStatus, getGuildJoiningArticlesStatus, getCurrentRankIndex } from '../session.js';

import { getArticle, guildJoiningArticles } from '../store/articles.js';
import { botName, botNameC } from '../store/script.js';
import { getRankName } from '../store/ranks.js';

const articleMessage = (article, status) => {
  return `📜 Манускрипт: <b>${article.title}</b>\n\nСтатус: <b>${status ? '✅ Прочитано' : 'Не прочитано'}</b>`
}

export const setupGuildJoiningStage = (bot) => {
  const menuTitle = '✨ Оберіть манускрипт:';

  const guildJoiningMenu = new Menu('guildJoiningMenu');

  const articlesSubmenus = guildJoiningArticles.map((articleKey) => {
    const article = getArticle(articleKey);

    guildJoiningMenu
      .submenu(`📜 ${article.title}`, articleKey, async (ctx) => {
        const status = getArticleStatus(ctx, articleKey);

        await ctx.editMessageText(articleMessage(article, status));
      })
      .row();

    const submenu = new Menu(articleKey)
      .text('✨ Відкрити манускрипт', async (ctx) => {
        await ctx.replyWithDocument(article.fileId);
      }).row()
      .text((ctx) => {
        const status = getArticleStatus(ctx, articleKey);

        return status ? '✖️ Позначити новим' : '✔️ Позначити прочитаним';
      }, async (ctx) => {
        const status = getArticleStatus(ctx, articleKey);

        await ctx.editMessageText(articleMessage(article, !status));

        setArticleStatus(ctx, articleKey, !status);

        ctx.menu.update();
      }).row()
      .back('⬅️ Повернутися', async (ctx) => {
        await ctx.editMessageText(menuTitle);

        const guildJoiningStatus = getGuildJoiningArticlesStatus(ctx);

        if (guildJoiningStatus) {
          await ctx.reply(`${botNameC} Чудово, друже! Тепер я можу прийняти тебе до Гільдії. Ти точно готовий? Шляху назад вже не буде...`, {
            reply_markup: new InlineKeyboard()
              .text('❗️ Вступити до Гільдії', 'joinGuildFinally')
          })
        }

      }).row();

    return submenu;
  });

  guildJoiningMenu.register(articlesSubmenus);

  bot.use(guildJoiningMenu);

  bot.callbackQuery('startGuildJoining', async (ctx) => {
    await ctx.reply(`${botNameC} Чудово! Тоді почнемо.\n\n Для участі в Гільдії треба продемонструвати базове розуміння ролі Продакт-Менеджера. Для цього тобі треба ознайомитися з двома манускриптами. Зроби це — і я зможу тебе прийняти.`);

    await ctx.reply(menuTitle, {
      reply_markup: guildJoiningMenu
    });

    await ctx.answerCallbackQuery();
  });
};

