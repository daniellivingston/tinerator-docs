import React, { useEffect } from 'react';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

import '../styles/fonts.css';
import '../styles/main.css';
import '../styles/markdown.css';
import '../styles/dracula.css';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load();
      Fathom.setSiteId('RETLQDNO');
      Fathom.trackPageview();
    }
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900">
      <Component {...pageProps} />
    </div>
  );
}

export default App;
