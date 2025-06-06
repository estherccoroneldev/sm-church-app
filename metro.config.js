const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);
// This is needed to support the `cjs` extension for CommonJS modules
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Disable package exports to avoid issues with certain packages (firebase/auth)
// that may not be compatible with the package exports feature
// This is particularly useful for packages that are not fully ESM compliant
// or have specific requirements for CommonJS modules.
// for more details, see: https://docs.expo.dev/guides/using-firebase/#configure-metro
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
