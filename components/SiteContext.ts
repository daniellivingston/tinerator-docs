import React from 'react';

interface Context {
  siteId: string;
  setSiteId: (id: string) => void;
}

const SiteContext: React.Context<Context> = React.createContext({
  siteId: null,
  setSiteId: (id: string) => {}
});

SiteContext.displayName = 'SiteContext';

export default SiteContext;
