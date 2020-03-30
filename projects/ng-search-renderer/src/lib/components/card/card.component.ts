import { Component, OnInit, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "ng-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input() title: string;
  @Input() imageUrl: string;
  @Input() tags: string[];
  @Input() downloadIcon: IconDefinition;

  ngOnInit(): void {}
}
