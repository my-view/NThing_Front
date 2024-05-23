import React from 'react';
import { theme } from '~/../theme';
import { Icon, IconButton } from 'components/common/icon';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export const InputToolbar: React.FC<{
  value: string;
  onChange: (text: string) => void;
  onSend: (newMsg: string) => void;
}> = ({ value, onChange, onSend }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ToolbarContainer>
        <CameraIconWrapper>
          <Icon name='F_Camera' size={24} color={theme.palette.gray03} />
        </CameraIconWrapper>
        <Row style={{ position: 'relative', flex: 1 }}>
          <MessageInput
            placeholder='메시지를 입력하세요'
            value={value}
            onChangeText={(text) => onChange(text)}
          />
          <IconButton
            onPress={() => onSend(value)}
            style={{ position: 'absolute', right: 11 }}
          >
            <Icon
              name='F_Send'
              size={24}
              color={value ? theme.palette.gray06 : theme.palette.gray03}
            />
          </IconButton>
        </Row>
      </ToolbarContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 20,
  },
});

const ToolbarContainer = styled(Row)`
  padding: 10px 20px;
  gap: 12px;
  background-color: #fff;
  border-color: #f5f5f5;
  border-top-width: 1px;
`;

const CameraIconWrapper = styled.Pressable`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const MessageInput = styled.TextInput`
  width: 100%;
  padding: 16px 46px 16px 14px;
  background-color: ${(p) => p.theme.palette.gray01}4D;
  border-radius: 4px;
`;
