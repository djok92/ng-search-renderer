import { ResultItem } from "../interfaces/Result-item";
import { Product } from "../interfaces/Product";

export class Handler {
  constructor() {}
  public handleProduct(products: Product[]): ResultItem[] {
    return products.map((product: Product) => {
      return {
        title: product.title,
        imageUrl: product.imageUrl,
        tags: product.title.split(" ")
      };
    });
  }
}
