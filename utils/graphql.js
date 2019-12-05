import fetch from 'isomorphic-unfetch';

export default (query, variables, opts) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (opts.cookie) headers.cookie = opts.cookie;

  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      variables: variables || {}
    }),
    headers: headers,
    credentials: 'include'
  });
};
