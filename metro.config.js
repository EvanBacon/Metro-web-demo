// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

if (!config.resolver.extraNodeModules) config.resolver.extraNodeModules = {};

const { getBareExtensions } = require("@expo/config/paths");

const sourceExts = getBareExtensions([], {
  isTS: true,
  isReact: true,
  isModern: false,
});

config.resolver.preferNativePlatform = false;
config.resolver.sourceExts = sourceExts;

config.resolver.extraNodeModules["react-native"] = path.resolve(
  require.resolve("react-native-web/package.json"),
  ".."
);
config.resolver.platforms = ["ios", "android", "web"];

// if (!config.resolver.transformer) config.resolver.transformer = {};
// config.resolver.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: false,
//     inlineRequires: false,
//   },
// });

module.exports = config;
