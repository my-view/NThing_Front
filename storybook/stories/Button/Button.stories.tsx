/* Libraries */
import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { ComponentMeta, ComponentStory } from '@storybook/react';

/* Local files */
import Button from './Button';
import CenterView from '../../decorators/CenterView/CenterView';

export default {
  title: 'Button',
  decorators: [
    (Story): JSX.Element => (
      <CenterView>
        <Story />
      </CenterView>
    ),
  ],
} as ComponentMeta<typeof Button>;

export const WithText: ComponentStory<typeof Button> = ({
  children,
  onPress,
}) => <Button onPress={onPress}>{children}</Button>;

WithText.args = {
  onPress: action('clicked-with-text'),
  children: <Text>{text('Button text', 'Hello Button')}</Text>,
};
WithText.storyName = 'with text';
