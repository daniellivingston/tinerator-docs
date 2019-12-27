import { useEffect, useContext } from 'react';
import SiteContext from 'components/site_context';

export const useDefaultSite = siteData => {
  const { siteId, setSiteId } = useContext(SiteContext);

  useEffect(() => {
    if (!siteData) return;
    if (siteData.status === 'ok') {
      setSiteId(siteData.site.id);
    }
  }, [siteData]);

  return siteId;
};
