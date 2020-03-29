import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { Handler } from "../../classes/Handler";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ResultService } from "../../services/result.service";
import { ResultItem } from "../../interfaces/Result-item";
import { Product } from "../../interfaces/Product";
import { Category } from "../../interfaces/Category";

@Component({
  selector: "ng-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private resultSevice: ResultService) {}

  public searchResults: ResultItem[];
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  @Input() products: Product[];
  @Input() categories: Category[];
  @Input() activeCategoryName: string;

  ngOnChanges() {
    if (
      this.activeCategoryName &&
      this.products &&
      this.resultSevice.categories.length > 0
    ) {
      console.log("fired");
      this.resultSevice.handleProducts(this.activeCategoryName, this.products);
    }
  }

  ngOnInit() {
    this.resultSevice.mapCategories(this.categories);
    this.resultSevice.handleProducts(this.activeCategoryName, this.products);
    this.resultSevice
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
