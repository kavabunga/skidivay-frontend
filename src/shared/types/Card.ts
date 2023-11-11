export interface CardProps {
  _id?: string;
  name?: string;
  category?: string;
  cardNumber: string;
  barcodeNumber: string;
  shopName?: string | null;
  shopLogo?: string | null;
  isLiked?: boolean;
}
