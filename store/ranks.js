export const rankNames = {
  0: '<i>Гість</i>',
  1: '<b>🛡️ Рекрут</b>',
  2: '<b>⚔️ Воїн</b>',
  3: '<b>💎 Герой</b>',
  4: '<b>💣 Ветеран</b>',
  5: '<b>🔮 Майстер</b>',
  6: '<b>🎇 Легенда</b>'
};

export const ranksList = [1, 2, 3, 4, 5, 6].map((i) => rankNames[i]);

export const getRankName = (rankIndex) => rankNames[rankIndex];