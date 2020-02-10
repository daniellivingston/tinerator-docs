const slug = require('rehype-slug');
const link = require('rehype-autolink-headings');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [slug, [link, { behavior: 'wrap' }]]
  }
});
const path = require('path');

module.exports = withMDX({
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  webpack(config, options) {
    // Allow absolute imports of common paths
    // See https://github.com/zeit/next.js/blob/master/examples/with-absolute-imports/next.config.js
    ['components', 'utils', 'data'].forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });
    return config;
  }
});
