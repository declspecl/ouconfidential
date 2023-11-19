/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ijcrsqwmrlcgefqhxdsk.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/board-profile-pictures/**"
            }
        ]
    }
}

module.exports = nextConfig
