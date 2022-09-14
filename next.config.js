module.exports = (phase, { defaultConfig }) => {
    const rewrites = () => {
        return [
            {
                source: '/:path*',
                destination: "http://10.0.3.47:8088/:path*",
            },
        ];
    }

    return { rewrites }
}