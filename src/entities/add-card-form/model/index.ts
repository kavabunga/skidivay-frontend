import { IPostCard, api } from '~/shared';

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
