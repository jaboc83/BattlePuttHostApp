export const battle = '/battle';
export const game = '/game';
export const rejoin = '/rejoin';
export const start = '/start';
export const clientUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002/BattlePuttClientApp'
    : 'https://github.com/jaboc83/BattlePuttClientApp';