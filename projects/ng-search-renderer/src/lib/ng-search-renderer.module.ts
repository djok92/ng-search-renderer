import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CardComponent } from "./components/card/card.component";
import { ResultsComponent } from "./pages/results/results.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [ResultsComponent, CardComponent],
  imports: [BrowserModule, FontAwesomeModule],
  exports: [ResultsComponent]
})
export class NgSearchRendererModule {}
