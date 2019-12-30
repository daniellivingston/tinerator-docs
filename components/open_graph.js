import Head from 'next/head';

export default props => {
  const url = `https://statickit.com${props.path}`;
  const image = props.image || 'https://statickit.com/static/og-logo.png';

  const twitterCard = props.twitterCard || 'summary';

  return (
    <Head>
      <meta
        property="description"
        content={props.description}
        key="description"
      />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:title" content={props.title} key="og:title" />
      <meta property="og:locale" content="en_US" key="og:locale" />
      <meta
        property="og:description"
        content={props.description}
        key="og:description"
      />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:site_name" content="StaticKit" key="og:site_name" />
      <meta property="og:image" content={image} key="og:image" />
      <meta name="twitter:site" content="@statickit" key="twitter:site" />
      <meta name="twitter:card" content={twitterCard} key="twitter:card" />
    </Head>
  );
};
