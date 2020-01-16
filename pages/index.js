import HomePage from './home';
import { getToken } from 'utils/auth';
import { fetch as fetchViewer } from 'data/viewer';
import { redirectTo } from 'utils/routing';

function IndexPage(props) {
  return <HomePage {...props} />;
}

IndexPage.getInitialProps = async context => {
  const token = getToken(context);
  const viewerData = await fetchViewer(token);

  // Redirect if logged in
  if (viewerData.status === 'ok') {
    const {
      defaultSite: { id: siteId }
    } = viewerData.viewer;

    if (siteId) {
      redirectTo('/sites/[siteId]', `/sites/${siteId}`, context);
    } else {
      redirectTo('/sites/new', undefined, context);
    }
  }

  return { viewerData };
};

export default IndexPage;
