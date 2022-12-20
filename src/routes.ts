export const battle = '/battle';
export const game = '/game';
export const knockout = '/knockout';
export const fiftyPutts = '/fiftyPutts';
export const rejoin = '/rejoin';
export const start = '/start';
export const clientUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002/BattlePuttClientApp'
    : 'https://jaboc83.github.io/BattlePuttClientApp';

export const getRouteFromSlug = (slug: string) => {
  const routeMap = new Map<string, string>();
  routeMap.set('knockout', knockout);
  routeMap.set('fiftyputts', fiftyPutts);

  if (!routeMap.has(slug)) throw new Error(`invalid slug: ${slug}`);
  return routeMap.get(slug);
};
