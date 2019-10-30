const slug = require('rehype-slug');
const link = require('rehype-autolink-headings');
const withCSS = require('@zeit/next-css');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [slug, [link, { behavior: 'wrap' }]]
  }
});

module.exports = withMDX(
  withCSS({
    target: 'serverless',
    env: {
      STATICKIT_URL: process.env.STATICKIT_URL,
      FORM_ID: process.env.FORM_ID
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'md']
  })
);
