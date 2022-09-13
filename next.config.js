module.exports = (phase, { defaultConfig }) => {
    const rewrites = () => {
        return [
            {
                source: '/:path*',
                destination: "URL",
            },
        ];
    }

    return { rewrites }
}