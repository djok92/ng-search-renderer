import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSearchRendererComponent } from './ng-search-renderer.component';

describe('NgSearchRendererComponent', () => {
  let component: NgSearchRendererComponent;
  let fixture: ComponentFixture<NgSearchRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSearchRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSearchRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
