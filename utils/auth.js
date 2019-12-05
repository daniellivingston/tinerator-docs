export const redirectToSignin = res => {
  if (res) {
    res
      .writeHead(302, {
        Location: 'http://localhost:4000/signin'
      })
      .end();
  } else {
    window.location = 'http://localhost:4000/signin';
  }
};
