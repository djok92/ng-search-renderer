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

  private _categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);
  private _searchResults$: BehaviorSubject<ResultItem[]> = new BehaviorSubject<
    ResultItem[]
  >([]);
  private _error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public setCategories(categories: Category[]): void {
    this._categories$.next(categories);
  }

  public getError(): Observable<boolean> {
    return this._error$.asObservable();
  }

  public handleProducts(categoryName: string, products: Product[]): void {
    let mappedResults;
    let activeCategory: Category;

    activeCategory = this._categories$.value.find(
      (category: Category) =>
        category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (activeCategory) {
      this.setError(false);
      if (!activeCategory.active) {
        activeCategory.active = true;
        activeCategory.handler = new Handler();
        mappedResults = activeCategory.handler.handleProduct(products);
      } else {
        mappedResults = activeCategory.handler.handleProduct(products);
      }
      this.setResultItems(mappedResults);
    } else {
      this.setError(true);
    }
  }

  public getResultItems(): Observable<ResultItem[]> {
    return this._searchResults$.asObservable();
  }

  private setResultItems(mappedItems: ResultItem[]): void {
    this._searchResults$.next(mappedItems);
  }

  private setError(value: boolean): void {
    this._error$.next(value);
  }
}
