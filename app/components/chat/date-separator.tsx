import { Pressable, Text, View } from 'react-native';
import { Divider } from '../common/divider';
import { Font10W500 } from '../common/text';

export const DateSeparator: React.FC<{
  date: any;
}> = ({ date }) => {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Divider style={{ flex: 1 }} />
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Font10W500
          style={{
            color: '#ADB1BA',
          }}
        >
          {date}
        </Font10W500>
      </View>
      <Divider style={{ flex: 1 }} />
    </View>
  );
};
