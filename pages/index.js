import Viewer from '../data/viewer';
import HomePage from '../pages/home';

function IndexPage(props) {
  if (props.viewer === 'anonymous') {
    return <HomePage {...props} />;
  }

  return <div></div>;
}

IndexPage.getInitialProps = async context => {
  const viewer = await Viewer.fetch(context);
  return { viewer };
};

export default IndexPage;
