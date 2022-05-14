# Metro web demo

> This is a weekend project, I have no plans to land this in Expo.

Demo of using Metro to bundle Expo apps for web. [Try the web demo](https://metro-web.netlify.app/) (notice the giant JavaScript bundle).

This project also has full Fast Refresh support enabled and a few other React Native debugging features.

There is no bundle splitting, CSS handling, HTML templating, PWA Manifest generation, Service Worker configuration, React Suspense, or other critcal features in this Metro implementation.

The results of `@expo/webpack-config` (Webpack) are much nicer and far more sophisticated, I recommend Webpack for `react-native-web` usage.

## Usage

- Pull the `@evanbacon/cli/metro-web-support` branch on [expo/expo](https://github.com/expo/expo/) and setup the [local CLI](https://github.com/expo/expo/tree/main/packages/%40expo/cli#contributing).
- Pull this project, run `yarn`.
- Set the environment variable `EXPO_USE_METRO_WEB` to `1` or `true`.
- Run `expo start` (using the local CLI), then press `w`.

You can also bundle the project by running `expo export` then test locally with `npx serve dist` or deploy with `npx netlify deploy --dir dist`

## Further Work

- Web and native cannot be run at the same time because Metro hard codes the usage of `.native.js` files. In my project, the `preferNativePlatform` value has been turned off in a patch (breaking native).
