export const replaceQuery = (url?: string) => (query?: Record<string, string>) => {
  if (!url || !query) return url;
  let res = url;
  Object.entries(query).forEach(([k, v]) => {
    res = res.replace(new RegExp(`\\[${k}\\]`, 'ig'), v);
  });
  if (res.indexOf('[') < res.indexOf(']'))
    throw new Error(
      `['react-query' Error]: you must replace all the query args you provide in the url, the url: '${url}', the query args: '${JSON.stringify(
        query
      )}'`
    );
  return res;
};
