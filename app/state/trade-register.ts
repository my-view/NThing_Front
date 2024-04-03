import { create } from 'zustand';
import { Asset } from 'react-native-image-picker';
import { TradeDate, TradePlace } from 'types/common';
import { krNow } from 'assets/util/time';
import moment from 'moment';

const nowHour = krNow.getHours();

const initialDate = {
  now: krNow,
  day: nowHour < 23 ? 0 : 1,
  hour: nowHour < 23 ? nowHour + 1 : 0,
  minute: 0,
  full: '',
};

const formatFullDate = (tradeDate: TradeDate) => {
  const date = tradeDate.now;
  moment(date).add(tradeDate.day, 'days');
  moment(date).add(tradeDate.hour, 'hours');
  moment(date).add(tradeDate.minute, 'minutes');
  return moment(date).format('yyyy-MM-DD HH:mm:ss');
};

interface NThing {
  denominator: string;
  numerator: string;
}

interface TradeRegisterStoreType {
  title: string;
  category: number; // id
  images: Asset[];
  place: TradePlace;
  date: TradeDate;
  nThing: NThing;
  price: string;
  description: string;
  isDateOpen: boolean;
  isValid: () => boolean;
  baseForm: () => FormData;
  setTitle: (title: string) => void;
  setCategory: (category: number) => void;
  setImages: (callback: (state: Asset[]) => Asset[]) => void;
  setPlace: (place: TradePlace) => void;
  setDate: (date: TradeDate) => void;
  setNThing: (callback: (state: NThing) => NThing) => void;
  setPrice: (price: string) => void;
  setDescription: (description: string) => void;
  toggleIsDateOpen: () => void;
  validate: () => void;
}

const useTradeRegisterStore = create<TradeRegisterStoreType>((set, get) => ({
  title: '',
  category: 0,
  images: [],
  place: {
    coord: { latitude: 37.54965725, longitude: 126.9399627 }, // TODO: 학교 위치로 초기값 채우기
    description: '',
  },
  date: initialDate,
  nThing: {
    denominator: '', // 분모
    numerator: '', // 분자
  },
  price: '',
  description: '',
  isDateOpen: false,
  isValid: () =>
    !!get().title.trim() &&
    !!get().category &&
    !!get().description.trim() &&
    !!get().place.coord &&
    !!get().place.description.trim() &&
    !!get().nThing.denominator &&
    !!get().nThing.numerator &&
    !!get().price.trim(),
  baseForm: () => {
    const form = new FormData();
    const place = get().place;
    form.append('title', get().title);
    form.append('category_id', get().category);
    form.append('latitude', place.coord.latitude);
    form.append('longitude', place.coord.longitude);
    form.append('place', place.description);
    form.append('date', formatFullDate(get().date));
    form.append('denominator', get().nThing.denominator);
    form.append('numerator', get().nThing.numerator);
    form.append('price', get().price);
    form.append('description', get().description);
    return form;
  },
  setTitle: (title) => set({ title }),
  setCategory: (category) => set({ category }),
  setImages: (callback) => set((state) => ({ images: callback(state.images) })),
  setPlace: (place) => set({ place }),
  setDate: (date) => set({ date }),
  setNThing: (callback) => set((state) => ({ nThing: callback(state.nThing) })),
  setPrice: (price) => set({ price }),
  setDescription: (description) => set({ description }),
  toggleIsDateOpen: () => set((state) => ({ isDateOpen: !state.isDateOpen })),
  validate: () => {
    if (!get().title.trim()) throw '글 제목을 입력해주세요.';
    if (!get().category) throw '카테고리를 선택해주세요.';
    if (!get().description.trim()) throw '글 내용을 입력해주세요.';
    if (!get().place.coord) throw '거래 희망 장소를 입력해주세요.';
    if (!get().place.description.trim())
      throw '거래 희망 장소 설명을 입력해주세요.';
    if (!get().nThing.denominator || !get().nThing.numerator)
      throw 'N띵 정보를 입력해주세요.';
    if (!get().price.trim()) throw '가격을 입력해주세요.';
  },
}));

export default useTradeRegisterStore;
