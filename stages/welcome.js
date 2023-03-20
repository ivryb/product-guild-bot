import { InlineKeyboard } from 'grammy';

import { setIntroStatus } from '../session.js';

import { botName, botNameC } from '../store/script.js';
import { getRankName } from '../store/ranks.js';

export const setupWelcomeStage = (bot) => {
  const getWelcomeKeyboard = (ctx) => {
    const { guild, pms } = ctx.session.introStatus;

    let keyboard = new InlineKeyboard();

    if (!guild) {
      keyboard.text('💭 Розкажи про "Гільдію"', 'welcomeAboutGuild').row();
    }

    if (!pms) {
      keyboard.text('💭 Хто такі "Продакт-Менеджери"?', 'welcomeAboutPMs').row();
    }

    if (guild && pms) {
      keyboard.text('💭 Цікаво...', 'welcomeEnd').row();
    }

    return keyboard;
  }

  bot.command('start', async (ctx) => {
    await ctx.reply(`Вітаю, друже! Ласкаво просимо до <b>Гільдії Продакт-Менеджерів!</b>\n\nМене звати ${botName}, я буду твоїм провідником у світі запуску стартапів, а з часом — можливо й вірним союзником.`, {
      reply_markup: getWelcomeKeyboard(ctx)
    });
  });

  bot.callbackQuery('welcomeAboutPMs', async (ctx) => {
    setIntroStatus(ctx, 'pms');

    await ctx.reply(`${botNameC} Продакт-Менеджери — це люди, відповідальні за розвиток Продуктів. Це одна з найцікавіших та найскладніших професій сьогодення. Продакт-менеджери є в Google, Netflix, Uklon та Megogo — словом, у всіх компаніях, які створюють корисні продукти та сервіси. Саме ці люди приймають рішення які нові продукти треба запустити, і як саме оновити існуючі, щоб покращити життя мільйонів людей. Саме Продакт-Менеджери відповідальні за те, яким стане світ...`, {
      reply_markup: getWelcomeKeyboard(ctx)
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('welcomeAboutGuild', async (ctx) => {
    setIntroStatus(ctx, 'guild');

    await ctx.reply(`${botNameC} Гільдія була створена <b>Майстрами Продакт-Менеджменту</b>, щоб популяризувати це ремесло та допомагати новачкам запускати власні проєкти.\n\nУ Гільдії зберігаються знання, віднайдені десятками поколінь Майстрів та випробувані на сотнях проєктів.\n\nУчасники гільдії об'єднуються через чати та різноманітні зустрічі, а положення заслуговується досягненнями у Продакт-Менеджменті.`, {
      reply_markup: getWelcomeKeyboard(ctx)
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('welcomeEnd', async (ctx) => {
    await ctx.reply(`${botNameC} Якщо тобі цікаво, можеш спробувати вступити до Гільдії. Для цього треба буде виконати 2 невеликих завдання. Готовий?`, {
      reply_markup: new InlineKeyboard()
        .text('✨ Долучитися до Гільдії', 'startGuildJoining').row()
    })

    await ctx.answerCallbackQuery();
  });
}