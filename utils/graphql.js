import fetch from 'isomorphic-unfetch';

const endpoint =
  process.env.NODE_ENV == 'production'
    ? 'https://api.statickit.com'
    : 'http://localhost:4000';

export default (query, variables, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return fetch(`${endpoint}/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      variables: variables || {}
    }),
    headers: headers,
    credentials: 'include'
  });
};
