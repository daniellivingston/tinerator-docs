import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import * as Fathom from 'fathom-client';
import Footer from 'components/Footer';
import SiteContext from 'components/SiteContext';
import cookie from 'js-cookie';
import { StaticKitProvider } from '@statickit/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import '../styles/fonts.css';
import '../styles/main.css';
import '../styles/markdown.css';
import '../styles/dracula.css';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const stripePublishableKey =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_DNEs4P2feJyOmvhT8z9OSdxm'
    : 'pk_test_AEGjmWosrdHvOvnujk0cNHjQ';

const stripePromise = loadStripe(stripePublishableKey);

function App({ Component, pageProps }) {
  const [siteId, setSiteId] = useState(cookie.get('site'));

  useEffect(() => {
    Fathom.load('RETLQDNO', {
      canonical: false,
      excludedDomains: ['localhost']
    });
  }, []);

  // This flexbox stuff on body is for the sticky footer:
  // https://css-tricks.com/couple-takes-sticky-footer/#article-header-id-3
  return (
    <SiteContext.Provider
      value={{
        siteId,
        setSiteId: id => {
          cookie.set('site', id);
          setSiteId(id);
        }
      }}
    >
      <StaticKitProvider site="a38ad7363b35">
        <Elements stripe={stripePromise}>
          <div className="font-sans antialiased text-gray-900 flex flex-col h-screen">
            <div className="flex-grow flex-shrink-0">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </Elements>
      </StaticKitProvider>
    </SiteContext.Provider>
  );
}

export default App;
