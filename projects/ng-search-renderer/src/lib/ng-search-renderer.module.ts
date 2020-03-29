import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CardComponent } from "./components/card/card.component";
import { ResultsComponent } from "./pages/results/results.component";

@NgModule({
  declarations: [ResultsComponent, CardComponent],
  imports: [BrowserModule],
  exports: [ResultsComponent]
})
export class NgSearchRendererModule {}
