import React from 'react';

const SiteContext = React.createContext({
  siteId: null,
  setSiteId: id => {}
});

SiteContext.displayName = 'SiteContext';

export default SiteContext;
