import { fetch as fetchViewer } from '../data/viewer';
import HomePage from '../pages/home';

function IndexPage(props) {
  const { viewerData } = props;
  if (viewerData.status === 'unauthorized') {
    return <HomePage {...props} />;
  }

  return <div></div>;
}

IndexPage.getInitialProps = async context => {
  const viewerData = await fetchViewer(context);
  return { viewerData };
};

export default IndexPage;
