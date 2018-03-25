import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedProductManagerProductsComponent } from './not-approved-product-manager-products.component';

describe('NotApprovedProductManagerProductsComponent', () => {
  let component: NotApprovedProductManagerProductsComponent;
  let fixture: ComponentFixture<NotApprovedProductManagerProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotApprovedProductManagerProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedProductManagerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
