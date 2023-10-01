import React, { useEffect, useState } from 'react';
import WheelPicker from 'react-native-wheely';
import { theme } from '~/../theme';
import moment from 'moment';
import { TradeDate } from 'types/common';

export const CustomPicker: React.FC<{
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}> = ({ options, selectedIndex, onChange }) => {
  return (
    <WheelPicker
      selectedIndex={selectedIndex}
      options={options}
      onChange={(index) => onChange(index)}
      visibleRest={1}
      itemHeight={45}
      itemStyle={{ height: 45, paddingHorizontal: 17 }}
      itemTextStyle={{ color: theme.palette.primary, fontWeight: '600' }}
      selectedIndicatorStyle={{
        backgroundColor: 'white',
        borderRadius: 0,
        borderColor: theme.palette.gray01,
        borderBottomWidth: 1.4,
        borderTopWidth: 1,
      }}
    />
  );
};

const today = new Date();
const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];
const days = Array.from({ length: 30 }, (_, index) => {
  const day = new Date();
  day.setDate(today.getDate() + index);
  const date =
    index === 0 ? '오늘' : index === 1 ? '내일' : moment(day).format('MM.DD');
  return `${date} (${dayOfTheWeek[day.getDay()]})`;
});
const hours = Array.from({ length: 24 }, (_, index) => String(index));
const minutes = Array.from({ length: 6 }, (_, index) => String(index * 10));

export const DateTimePicker: React.FC<{
  defaultDate: TradeDate;
  updateDate: (date: TradeDate) => void;
}> = ({ defaultDate, updateDate }) => {
  const [day, setDay] = useState(defaultDate.day);
  const [hour, setHour] = useState(defaultDate.hour); // 현재 시간 기준으로 다음 시간으로 지정해주기
  const [minute, setMinute] = useState(defaultDate.minute);
  useEffect(() => {
    updateDate({
      day,
      hour,
      minute,
      full: `${days[day].split(' ')[0]}  ${moment(
        `2023-10-1 ${hours[hour]}:${minutes[minute]}:00`,
      ).format('HH:mm')}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, hour, minute]);
  return (
    <>
      <CustomPicker
        selectedIndex={day}
        options={days}
        onChange={(index) => setDay(index)}
      />
      <CustomPicker
        selectedIndex={hour}
        options={hours}
        onChange={(index) => setHour(index)}
      />
      <CustomPicker
        selectedIndex={minute}
        options={minutes}
        onChange={(index) => setMinute(index)}
      />
    </>
  );
};
