export const battle = '/battle';
export const game = '/game';
export const knockout = '/knockout';
export const perfectPutt = '/perfectputt';
export const horse = '/horse';
export const rejoin = '/rejoin';
export const start = '/start';
export const clientUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002/BattlePuttClientApp'
    : 'https://jaboc83.github.io/BattlePuttClientApp';
