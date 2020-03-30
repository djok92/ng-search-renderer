import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChange
} from "@angular/core";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ResultService } from "../../services/result.service";
import { ResultItem } from "../../interfaces/Result-item";
import { Product } from "../../interfaces/Product";
import { Category } from "../../interfaces/Category";
import {
  faCloudDownloadAlt,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "ng-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private resultSevice: ResultService) {}

  public downloadIcon: IconDefinition = faCloudDownloadAlt;
  public searchResults: ResultItem[];
  public hasError: boolean;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  @Input() products: Product[];
  @Input() categories: Category[];
  @Input() activeCategoryName: string;

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (
      // Coulda used changes["categories"].firstChange, but opted for this because this would run if list of categories did really change sometime.
      changes["categories"] &&
      changes["categories"].previousValue !== changes["categories"].currentValue
    ) {
      this.resultSevice.setCategories(this.categories);
    }

    if (
      changes["products"] &&
      changes["products"].previousValue !== changes["products"].currentValue
    ) {
      this.resultSevice.handleProducts(this.activeCategoryName, this.products);
      console.log(this.activeCategoryName);
      console.log(this.categories);
      console.log(this.products);
    }
  }

  ngOnInit() {
    this.resultSevice
      .getResultItems()
      .pipe(takeUntil(this._destroy$))
      .subscribe((searchResultItems: ResultItem[]) => {
        this.searchResults = searchResultItems;
      });
    this.resultSevice
      .getError()
      .pipe(takeUntil(this._destroy$))
      .subscribe((hasError: boolean) => {
        this.hasError = hasError;
        console.log(hasError);
      });
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
