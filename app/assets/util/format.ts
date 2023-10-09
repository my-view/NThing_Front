import moment from 'moment';

export const formatPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatElapsedTime = (date: string) => {
  const past = new Date(date);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diffSec < 60) return '방금';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일`;
  const diffWeek = Math.floor(diffDay / 7);
  return `${diffWeek}주`;
};

export const formatKorDate = (_date: string) => {
  const date = new Date(_date);
  const onlyDate = moment(date).format('YY.MM.DD');
  const amPm = date.getHours() >= 12 ? '오후' : '오전';
  const time = moment(date).format(
    `h시${date.getMinutes() > 0 ? ' mm분' : ''}`,
  );
  return `${onlyDate} ${amPm} ${time}`;
};
