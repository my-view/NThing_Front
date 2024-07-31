/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
          nonInlinedRequires: [
            '@react-native-async-storage/async-storage',
            'React',
            'react',
            'react-native',
          ],
          // storybook changed log 웹에서만 가능..
          // inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
