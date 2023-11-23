import { IPostCard, IPostCardWithShop, api } from '~/shared';

interface IGettingData {
  [key: string]: string;
}

export class AddCardFormModel {
  data: IPostCard;

  constructor(cardData: IGettingData) {
    const { barcodeNumber, cardNumber, shopId, shopName } = cardData;

    this.data = {
      shop: Number(shopId),
      name: shopName,
      card_number: cardNumber,
      barcode_number: barcodeNumber,
      //TODO: Это нужно менять
      encoding_type: 'ean-13',
    };
  }

  public createNewCard() {
    return api.postCard(this.data);
  }
}
export class AddCardWithShopFormModel {
  data: IPostCardWithShop;

  constructor(cardData: IGettingData) {
    const { barcodeNumber, cardNumber, shopName } = cardData;

    this.data = {
      shop: { name: shopName },
      name: shopName,
      card_number: cardNumber,
      barcode_number: barcodeNumber,
      //TODO: Это нужно менять
      encoding_type: 'ean-13',
    };
  }

  public createNewCard() {
    return api.postCardWithShop(this.data);
  }
}
