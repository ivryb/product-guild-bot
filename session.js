import { session } from 'grammy';

import { keyBy, mapValues } from 'lodash-es';

import { articlesNames, guildJoiningArticles } from './store/articles.js';

// import Database from '@replit/database';

// const db = new Database();

// const sessionStorageAdapter = {
//   async read(key) {

//   },
//   async write(key, value) {

//   },
//   async delete(key) {

//   }
// }

const getInitialSessionData = () => ({
  introStatus: {
    guild: false,
    pms: false,
    ranks: false,
    project: false
  },

  articlesStatuses: mapValues(keyBy(articlesNames), () => false),

  rank: 0
});

export const guildSession = session({
  initial: getInitialSessionData,
  //   storage: sessionStorageAdapter
});

export const setIntroStatus = (ctx, introName, status = true) => {
  ctx.session.introStatus[introName] = status;
}

export const setArticleStatus = (ctx, articleKey, value) => {
  ctx.session.articlesStatuses[articleKey] = value;
}

export const setRank = (ctx, rankIndex) => {
  ctx.session.rank = rankIndex;
}

export const getCurrentRankIndex = (ctx) => {
  return ctx.session.rank;
}

export const getArticleStatus = (ctx, articleKey) => {
  return Boolean(ctx.session.articlesStatuses[articleKey]);
}

export const getGuildJoiningArticlesStatus = (ctx) => {
  return guildJoiningArticles.every((articleKey) => getArticleStatus(ctx, articleKey));
}

