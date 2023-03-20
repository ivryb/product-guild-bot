export const articlesNames = ['aboutProductRole', 'POvsPM'];

export const Articles = {
  aboutProductRole: {
    title: 'Про роль менеджера продукту',
    fileId: 'BQACAgIAAxkBAAIBYWPqnBaeruZti-ANEC7pJrfPzRroAAK1KQACDpJRSynYY_1WivVDLgQ'
  },

  POvsPM: {
    title: 'Продакт vs. Проджект',
    fileId: 'BQACAgIAAxkBAAIBsmP3sZ877x2-psyAw3gSaKQiGTkyAALsKgACvqu5S8Z0yt8MiBpoLgQ'
  }
}

export const getArticles = (titles) => titles.map((key) => Articles[key]);

export const getArticle = (key) => Articles[key];

export const getArticlePageKey = (key) => `article-${key}`

export const guildJoiningArticles = ['aboutProductRole', 'POvsPM'];