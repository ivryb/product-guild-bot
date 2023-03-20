import { Menu } from '@grammyjs/menu';
import { InlineKeyboard } from 'grammy';

import { setRank, setIntroStatus } from '../session.js';

import { botName, botNameC, tutorName, tutorNameC } from '../store/script.js';
import { getRankName } from '../store/ranks.js';

export const setupGuildStart = (bot, { guildGeneralChatLink }) => {
  const getStartKeyboard = (ctx) => {
    const { ranks, project } = ctx.session.introStatus;

    let keyboard = new InlineKeyboard();

    if (!ranks) {
      keyboard.text('💭 Що таке Ранги?', 'introAboutGuildRanks').row();
    }

    if (!project) {
      keyboard.text('💭 Який Проєкт?', 'introAboutPersonalProject').row();
    }

    if (ranks && project) {
      keyboard.text('💭 Зрозумів', 'guildMenuStart').row();
    }

    return keyboard;
  }
  
  bot.callbackQuery('joinGuildFinally', async (ctx) => {
    setRank(ctx, 1);
    
    await ctx.reply(`${botNameC} Вітаю! Тепер ти член Гільдії Продакт-Менеджерів.\n\nДалі тобі допомогатиме ${tutorName}, вона тут відповідає за Рекрутів. Вона іноді буває трохи жорсткою, тож не ображайся. Я тебе попередив.\n\nІще, якщо ти раптово побачиш мого коня, Плотву, — дай мені знати, будь ласка. Постійно вона кудись зникає...`, {
      reply_markup: new InlineKeyboard()
        .text('💬 Добре, бувай', 'helloMari')
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('helloMari', async (ctx) => {
    await ctx.reply(`${tutorNameC} <i>Ех, бідолага ${botName}... Керівнитство поставило йому дуже жорсткі KPI, тепер шукає новачків день і ніч....</i>\n\nВітаю, новобранець! Ласкаво просимо до Гільдії. Твій новий ранг — ${getRankName(1)}.\n\nТепер ти можеш долучитися до нашого <i>загального Телеграм-чату</i> та вільно користуватися <i>базою знань Майстрів Гільдії</i>.\n\nЩоб продовжити свій шлях у Гільдії тобі треба буде обрати власний проєкт. Саме в роботі над власним проєктом народжуються <b>справжні Герої!</b>`, {
      reply_markup: getStartKeyboard(ctx)
    });
    
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('introAboutGuildRanks', async (ctx) => {
    setIntroStatus(ctx, 'ranks');
    
    await ctx.reply(`${tutorNameC} Твоє положення та можливості в Гільдії визначаються системою рангів. Усього їх 6.\n\nКожний ранг заслуговується певними досягненнями у продакт-менеджменті чи запуску стартапів.\n\nПерший ранг ${getRankName(1)} надається за базове розуміння ролі Продакт-Менеджера.\n\nЩоб отримати наступний ранг — ${getRankName(2)} — необхідно почати роботу над своїм проєктом та пройти стадію Discovery. Ну а далі — то вже інша розмова.`, {
      reply_markup: getStartKeyboard(ctx)
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('introAboutPersonalProject', async (ctx) => {
    setIntroStatus(ctx, 'project');
    
    await ctx.reply(`${tutorNameC} Проєктом може бути ідея нового сервісу/продукту/стартапу, про втілення якої ти вже давно розмірковував, але чомусь не міг почати.\n\nРесурси Гільдії можуть допомогти тобі втілити цю ідею.\n\nПлюс, на практиці значно краще засвоюються нові знання, тож це допоможе тобі отримати більше користі від перебування в Гільдії.`, {
      reply_markup: getStartKeyboard(ctx)
    });

    await ctx.answerCallbackQuery();
  });

  const guildMenu = new Menu('guildMenu');

  const sendInDevelopmentMessage = async (ctx) => {
    await ctx.editMessageText(`❕ Упс, розділ все ще знаходиться у розробці(\n\nВи можете поділитись своїми враженнями від боту через Зворотній зв'язок або завітати до нашого Чату 🙌🏻`);
  };

  guildMenu
    .url(`💬 Загальний Чат Гільдії`, guildGeneralChatLink).row()
    .submenu('🧙🏼‍♂️ Зворотній зв\'язок', 'guildFeedback', async (ctx) => {
        await ctx.editMessageText(`<i>🙋🏻‍♂️ Іван:</i> Дякую що скористались цим ботом) Поділитися своїми враженнями та ідеями ви можете написавши мені у персональні повідомлення: @ivryb`);
      }).row()
    .submenu('📖 Бібліотека', 'guildLibrary', sendInDevelopmentMessage).row()
    .submenu('🔬 Мій Проєкт', 'myGuildProject', sendInDevelopmentMessage).row()
    .submenu('🛡️ Ранги Гільдії', 'guildRanks', sendInDevelopmentMessage).row()

  const guildMenuTitle = '✨ Меню Гільдії';
  const guildMenuBackLabel = '⬅️ Повернутися';
  
  const guildSubmenuBack = async (ctx) => {
    await ctx.editMessageText(guildMenuTitle);
  };

  const guildSubmenues = [
    new Menu('guildFeedback').back(guildMenuBackLabel, guildSubmenuBack),
    new Menu('guildLibrary').back(guildMenuBackLabel, guildSubmenuBack),
    new Menu('myGuildProject').back(guildMenuBackLabel, guildSubmenuBack),
    new Menu('guildRanks').back(guildMenuBackLabel, guildSubmenuBack)
  ];

  guildMenu.register(guildSubmenues);

  bot.use(guildMenu);

  bot.callbackQuery('guildMenuStart', async (ctx) => {
    setIntroStatus(ctx, 'project');
    
    await ctx.reply(`${tutorNameC} Чудово. Можеш поки озирнутся навколо, ми ще побачимось пізніше)`);

    await ctx.reply(guildMenuTitle, {
      reply_markup: guildMenu
    });

    await ctx.answerCallbackQuery();
  });
};