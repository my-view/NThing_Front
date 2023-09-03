import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {withKnobs} from '@storybook/addon-knobs';

export const decorators = [withBackgrounds, withKnobs];
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: [
    {name: 'plain', value: 'white', default: true},
    {name: 'warm', value: 'hotpink'},
    {name: 'cool', value: 'deepskyblue'},
  ],
};