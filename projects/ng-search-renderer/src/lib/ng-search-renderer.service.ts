import { Injectable } from "@angular/core";
import { Category } from "./interfaces/Category";
import { Handler } from "./classes/Handler";
import { Product } from "./interfaces/Product";
import { BehaviorSubject, Observable } from "rxjs";
import { ResultItem } from "./interfaces/Result-item";

@Injectable({
  providedIn: "root"
})
export class NgSearchRendererService {
  constructor() {}

  private categories: Category[] = [];
  private _searchResults$: BehaviorSubject<ResultItem[]> = new BehaviorSubject<
    ResultItem[]
  >([]);

  public createCategories(categories: Category[]): void {
    this.categories = categories.map((category: Category) => {
      return {
        name: `${category.name.toLocaleLowerCase}Handler`,
        active: false
      };
    });
    console.log(this.categories);
  }

  public handleProducts(categoryName: string, products: Product[]): void {
    let mappedResults;
    const activeCategory = this.getActiveCategory(categoryName);
    if (activeCategory.active) {
      activeCategory.handler = new Handler();
      mappedResults = activeCategory.handler.handleProduct(products);
    } else {
      mappedResults = activeCategory.handler.handleProduct(products);
    }

    this.setResultItems(mappedResults);
  }

  public getResultItems(): Observable<ResultItem[]> {
    return this._searchResults$.asObservable();
  }

  private setResultItems(mappedItems: ResultItem[]): void {
    this._searchResults$.next(mappedItems);
  }

  private getActiveCategory(categoryName: string): Category {
    return this.categories.find(
      (category: Category) => category.name === categoryName
    );
  }
}
