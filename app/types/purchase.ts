export interface PurchaseDetail {
  id: number;
  title: string;
  images: [{ id: number; url: string }];
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  denominator: number; // 분자 (가질 개수)
  numerator: number; // 분모 (나누는 수)
  status: boolean;
  price: number;
  place: string;
  updated_at: string; // 예) 2023-08-14 09:39:08
  manager: string;
  category_id: number;
  category_name: string;
  liked: boolean;
}
