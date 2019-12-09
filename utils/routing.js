import Router from 'next/router';

export const redirectTo = (path, { res }) => {
  if (res) {
    res
      .writeHead(302, {
        Location: path
      })
      .end();
  } else {
    Router.push(path);
  }
};
