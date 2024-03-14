import styled from '@emotion/native';
import { TextStyle, View } from 'react-native';
import { theme } from '~/../theme';
import { RoundedButton } from '~/components/common/button';
import { Font15W700, Font14W400 } from '~/components/common/text';

const HostFinishButtonStyle = {
  paddingVertical: 10.5,
  backgroundColor: '#FCEEED',
};

const HostFinishButtonTextStyle: TextStyle = {
  color: theme.palette.error,
  fontWeight: '700',
};

// 불만족(기본)
const FinishButtonStyle = {
  width: '47.5%',
  paddingVertical: 10.5,
  backgroundColor: '#FCEEED',
};

const FinishButtonTextStyle: TextStyle = {
  color: theme.palette.error,
  fontWeight: '700',
};

export const FinishBubble: React.FC<{
  isHost: boolean;
  disabled?: boolean;
}> = ({ isHost, disabled }) => {
  return (
    <View>
      <Title>
        {isHost ? '거래가 완료되었습니다.' : '거래가 종료되었습니다.'}
      </Title>
      <Description>
        {isHost
          ? '거래를 잘 마치셨나요? 거래 종료하기 버튼을 눌러 채팅을 종료 하세요.'
          : '거래 호스트가 만족스러우셨나요? 아래 버튼을 통해 평가를 남겨주세요.'}
      </Description>
      {isHost ? (
        <RoundedButton
          title='거래 종료하기'
          disabled={disabled}
          style={HostFinishButtonStyle}
          textStyle={HostFinishButtonTextStyle}
          onPress={() => console.log('거래 종료하기')}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <RoundedButton
            title='불만족'
            style={FinishButtonStyle}
            disabled={disabled}
            textStyle={FinishButtonTextStyle}
            onPress={() => console.log('불만족')}
          />
          <RoundedButton
            title='만족'
            disabled={disabled}
            style={{ ...FinishButtonStyle, backgroundColor: '#EBF9F6' }}
            textStyle={{ ...FinishButtonTextStyle, color: '#34C185' }}
            onPress={() => console.log('만족')}
          />
        </View>
      )}
    </View>
  );
};

const Title = styled(Font15W700)``;

const Description = styled(Font14W400)`
  margin: 16px 0 24px 0;
  color: ${(p) => p.theme.palette.gray04};
  line-height: 20px;
`;
