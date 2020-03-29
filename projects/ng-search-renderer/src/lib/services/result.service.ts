import { Injectable } from "@angular/core";
import { Category } from "../interfaces/Category";
import { BehaviorSubject, Observable } from "rxjs";
import { ResultItem } from "../interfaces/Result-item";
import { Product } from "../interfaces/Product";
import { Handler } from "../classes/Handler";

@Injectable({
  providedIn: "root"
})
export class ResultService {
  constructor() {}

  public categories: Category[] = [];
  private _searchResults$: BehaviorSubject<ResultItem[]> = new BehaviorSubject<
    ResultItem[]
  >([]);

  public mapCategories(categories: Category[]): void {
    this.categories = categories.map((category: Category) => {
      return {
        name: category.name,
        // handlerName: `${category.name.toLocaleLowerCase()}Handler`,
        active: false
      };
    });
    console.log(this.categories);
  }

  public handleProducts(categoryName: string, products: Product[]): void {
    let mappedResults;
    const activeCategory = this.getActiveCategory(categoryName);
    console.log(activeCategory);
    console.log(this.categories);
    console.log(activeCategory.active);
    if (!activeCategory.active) {
      console.log("ran create first time");
      activeCategory.handler = new Handler();
      activeCategory.active = true;
      mappedResults = activeCategory.handler.handleProduct(products);
      console.log(this.categories);
    } else {
      console.log("used existing");
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
    console.log(categoryName);
    return this.categories.find(
      (category: Category) =>
        category.name.toLowerCase() === categoryName.toLowerCase()
    );
  }
}
