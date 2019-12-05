export default req => {
  if (req && req.headers) return req.headers.cookie;
  return undefined;
};
