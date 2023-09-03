module.exports = {
    stories: ['../storybook/stories/**/*.stories.?(ts|tsx|js|jsx)'],
    addons: [
      '@storybook/addon-actions',
      '@storybook/addon-links',
      '@storybook/addon-knobs',
      '@storybook/addon-essentials',
      '@storybook/addon-react-native-web',
    ],
    framework: '@storybook/react',
  };