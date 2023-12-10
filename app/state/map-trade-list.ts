import { atom, selector } from 'recoil';

export const mapTradeState = atom({
  key: 'map/mapTradeState',
  default: {}, // 로그인 상황일때는 true , 아닐때는 false
});

export const uniqueListState = selector({
  key: 'map/uniqueListState',
  get: ({ get }) => {
    const originalList = get(mapTradeState);

    const uniqueList = originalList.filter(
        (item, index, self) => index === self.findIndex((i) => i.id === item.id)
    );
    return uniqueList;
    }
});