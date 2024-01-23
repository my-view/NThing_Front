import { TradeParams } from '~/types/common';

export const tradeQueryKeys = {
  all: ['trade'] as const,
  list: (tradeParams: TradeParams) =>
    [...tradeQueryKeys.all, 'list', { tradeParams }] as const,
};
