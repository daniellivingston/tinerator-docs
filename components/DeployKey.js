import { useDefaultSite } from 'utils/default-site';
import { useRouter } from 'next/router';
import { useSiteData } from 'data/site';

export default function DeployKey() {
  const router = useRouter();
  const defaultSiteId = useDefaultSite();
  const siteId = router.query.siteId || defaultSiteId;
  const { siteData } = useSiteData(siteId);

  if (siteData && siteData.site) {
    return <span>{siteData.site.deployKey}</span>;
  }

  return <span>&lt;your-deploy-key&gt;</span>;
}
