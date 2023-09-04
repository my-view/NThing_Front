/* Libraries */
import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { ComponentMeta, ComponentStory } from '@storybook/react';

/* Local files */
import NT_Text from './Text';
import { Font14W400, Font14W600 } from '~/components/common/text';
import CenterView from '../../decorators/CenterView/CenterView';

export default {
  title: 'Text',
  decorators: [
    (Story): JSX.Element => (
      <CenterView>
        <Story />
      </CenterView>
    ),
  ],
} as ComponentMeta<typeof Text>;

export const Font14: ComponentStory<typeof Text> = ({ children }) => (
  <Font14W400>{children}</Font14W400>
);

Font14.args = {
  children: text('Font14', 'Font 14'),
};
Font14.storyName = 'Font14';
