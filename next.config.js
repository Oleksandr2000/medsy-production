/** @type {import('next').NextConfig} */

function getConfig(config) {
  return config;
}

module.exports = getConfig({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
