import React from 'react';

const SiteContext = React.createContext({
  siteId: null,
  setSiteId: () => {}
});

SiteContext.displayName = 'SiteContext';

export default SiteContext;
