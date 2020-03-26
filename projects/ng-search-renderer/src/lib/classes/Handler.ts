import { Product } from "../interfaces/Product";
import { ResultItem } from "../interfaces/Result-item";

export class Handler {
  constructor() {}
  public handleProduct(products: Product[]): ResultItem[] {
    return products.map((product: Product) => {
      return {
        title: product.title,
        imageUrl: product.imageUrl,
        tags: product.category.split(" ")
      };
    });
  }
}
