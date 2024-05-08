import { create } from 'zustand';
import { Asset } from 'react-native-image-picker';
import { TradeDate, TradePlace } from 'types/common';
import { krNow } from 'assets/util/time';
import moment from 'moment';

interface LikeTradeStoreType {}

const useLikeTradeStore = create<LikeTradeStoreType>((set, get) => ({}));

export default useLikeTradeStore;
