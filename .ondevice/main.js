module.exports = {
    stories: ['../storybook/stories/**/*.stories.?(ts|tsx|js|jsx)'],
    addons: [
      '@storybook/addon-ondevice-notes',
      '@storybook/addon-ondevice-controls',
      '@storybook/addon-ondevice-backgrounds',
      '@storybook/addon-ondevice-actions',
      '@storybook/addon-ondevice-knobs'
    ],
  };