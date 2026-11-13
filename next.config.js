/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/overview', destination: '/overview.html' },
      { source: '/team', destination: '/team.html' },
      { source: '/literature', destination: '/literature.html' },
      { source: '/timeline', destination: '/timeline.html' },
      { source: '/roadmap', destination: '/roadmap.html' },
      { source: '/architecture', destination: '/architecture.html' },
      { source: '/schematics', destination: '/architecture.html' },
      { source: '/survey', destination: '/survey.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/contact', destination: '/contact.html' },
      { source: '/project', destination: '/overview.html' },
    ];
  },
};

module.exports = nextConfig;
