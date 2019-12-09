import { fetch as fetchViewer } from '../data/viewer';
import { getToken } from '../utils/auth';
import HomePage from '../pages/home';
import DashboardPage from '../pages/dashboard';

function IndexPage(props) {
  const { viewerData } = props;
  if (viewerData.status === 'ok') {
    return <DashboardPage {...props} />;
  } else {
    return <HomePage {...props} />;
  }
}

IndexPage.getInitialProps = async context => {
  const token = getToken(context);
  const viewerData = await fetchViewer(token);
  return { viewerData };
};

export default IndexPage;
