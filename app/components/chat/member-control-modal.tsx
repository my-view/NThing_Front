import OutsidePressHandler from 'react-native-outside-press';
import { Shadow } from 'react-native-shadow-2';
import { Pressable } from 'react-native';
import { Font15W500 } from 'components/common/text';
import styled from '@emotion/native';

export const MemeberControlModal: React.FC<{
  isHost: boolean;
  setOpen: any;
}> = ({ isHost, setOpen }) => {
  const optionButtonHitSlop = {
    top: 10,
    bottom: 10,
    left: 18,
    right: 18,
  };

  return (
    <>
      <OutsidePressHandler
        style={{
          position: 'absolute',
          top: 40,
          zIndex: 9000,
        }}
        onOutsidePress={() => {
          setOpen(false);
        }}
      >
        <Container>
          <Pressable
            hitSlop={optionButtonHitSlop}
            onPress={() => console.log('신고')}
          >
            <Font15W500>신고</Font15W500>
          </Pressable>
          {isHost && (
            <>
              <VerticalDivider />
              <Pressable
                hitSlop={optionButtonHitSlop}
                onPress={() => console.log('강퇴')}
              >
                <Font15W500>강퇴</Font15W500>
              </Pressable>
            </>
          )}
        </Container>
      </OutsidePressHandler>
    </>
  );
};

const Container = styled(Shadow)`
  padding: 13px 24px;
  background-color: white;
  border-radius: 8px;
  flex-direction: row;
`;

const VerticalDivider = styled.View`
  width: 1px;
  height: 100%;
  margin: 0 18px;
  background-color: ${(p) => p.theme.palette.gray01};
`;
