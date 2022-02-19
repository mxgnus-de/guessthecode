/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['www.gravatar.com', 'avatars.githubusercontent.com', 'cdn.discordapp.com']
    }
}

module.exports = nextConfig
