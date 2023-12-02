import { IPostCard, api } from '~/shared';

interface IGettingData {
  [key: string]: string;
}

export class AddCardFormModel {
  data: IPostCard;
  isNewShop: boolean;

  constructor(cardData: IGettingData) {
    const { barcode_number, card_number, shop_id, shop_name } = cardData;
    this.isNewShop = !shop_id;
    this.data = {
      shop: shop_id ? Number(shop_id) : { name: shop_name },
      name: shop_name,
      card_number: card_number,
      barcode_number: barcode_number,
      encoding_type: 'ean-13',
    };
  }

  public createNewCard() {
    return this.isNewShop
      ? api.postCardWithShop(this.data)
      : api.postCard(this.data);
  }
}
