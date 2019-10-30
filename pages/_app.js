import React, { useEffect } from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Fathom from 'fathom-client';

import '../styles/fonts.css';
import '../styles/main.css';
import '../styles/markdown.css';
import '../styles/dracula.css';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function Layout(props) {
  const { children } = props;

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load();
      Fathom.setSiteId('RETLQDNO');
      Fathom.trackPageview();
    }
  }, []);

  return <div className="font-sans antialiased text-gray-900">{children}</div>;
}

class AppWithLayout extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default AppWithLayout;
