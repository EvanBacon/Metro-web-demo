// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

if (!config.resolver.extraNodeModules) {
  config.resolver.extraNodeModules = {};
}

// Add basic source extension support with all platforms stripped away.
const { getBareExtensions } = require("@expo/config/paths");

const sourceExts = getBareExtensions([], {
  isTS: true,
  isReact: true,
  isModern: false,
});

config.resolver.sourceExts = sourceExts;

// Create a resolver which dynamically disables support for
// `*.native.*` extensions on web.
const { resolve } = require("metro-resolver");
config.resolver.resolveRequest = (
  context,
  _realModuleName,
  platform,
  moduleName
) => {
  const contextResolveRequest = context.resolveRequest;
  delete context.resolveRequest;
  try {
    // Disable `*.native.*` extensions on web.
    context.preferNativePlatform = platform !== "web";
    return resolve(context, moduleName, platform);
  } catch (e) {
    throw e;
  } finally {
    context.resolveRequest = contextResolveRequest;
  }
};

// Remap `react-native` to `react-native-web` -- no idea how this works across platforms.
config.resolver.extraNodeModules["react-native"] = path.resolve(
  require.resolve("react-native-web/package.json"),
  ".."
);

// Add support for the big three.
config.resolver.platforms = ["ios", "android", "web"];

module.exports = config;
