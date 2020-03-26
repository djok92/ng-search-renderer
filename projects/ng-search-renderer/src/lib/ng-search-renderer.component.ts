import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { Product } from "./interfaces/Product";
import { NgSearchRendererService } from "./ng-search-renderer.service";
import { Category } from "./interfaces/Category";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ResultItem } from "./interfaces/Result-item";

@Component({
  selector: "lib-ng-search-renderer",
  template: `
    <p>
      ng-search-renderer works!
    </p>
  `,
  styles: []
})
export class NgSearchRendererComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private ngSearchRendererService: NgSearchRendererService) {}

  public searchResults: ResultItem[];
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  @Input() products: Product[];
  @Input() categories: Category[];
  @Input() activeCategoryName: string;

  ngOnChanges() {
    if (this.activeCategoryName && this.products) {
      this.ngSearchRendererService.handleProducts(
        this.activeCategoryName,
        this.products
      );
    }
  }

  ngOnInit() {
    console.log(this.products);
    this.ngSearchRendererService.createCategories(this.categories);
    this.ngSearchRendererService
      .getResultItems()
      .pipe(takeUntil(this._destroy$))
      .subscribe((searchResultItems: ResultItem[]) => {
        this.searchResults = searchResultItems;
        console.log(this.searchResults);
      });
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
