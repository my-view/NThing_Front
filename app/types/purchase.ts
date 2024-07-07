interface PurchaseImage {
  id: number;
  url: string;
}

export interface PurchaseDetail {
  id: number;
  title: string;
  images: PurchaseImage[];
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  denominator: number; // 분모 (나누는 수)
  numerator: number; // 분자 (가질 개수)
  status: boolean;
  price: number;
  place: string;
  updated_at: string; // 안쓰고 있는 값
  created_at: string; // 예) 2023-08-14 09:39:08
  manager: { id: number; nickname: string; profile_image: string };
  is_manager: boolean;
  is_joined: boolean;
  is_completed: boolean;
  category_id: number;
  category_name: string;
  is_liked: boolean;
}
