module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        "plugins": [
            ["module-resolver", {
                "root": ["./src"],
                "alias": {
                    "@components": "./src/common/components",
                    "@styles": "./src/common/styles",
                    "@contexts": "./src/common/contexts",
                    "@constants": "./src/constants",
                    "@modules": "./src/modules",
                    "@navigation": "./src/navigation",
                    "@queries": "./src/queries",
                    "@services": "./src/services",
                    "@utils": "./src/utils",
                }
            }], [
                'module:react-native-dotenv',
                {
                    moduleName: 'react-native-dotenv',
                    verbose: false,
                },
            ]
        ]
    };
};
