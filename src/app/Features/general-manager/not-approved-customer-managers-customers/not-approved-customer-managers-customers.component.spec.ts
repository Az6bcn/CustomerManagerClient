import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedCustomerManagersCustomersComponent } from './not-approved-customer-managers-customers.component';

describe('NotApprovedCustomerManagersCustomersComponent', () => {
  let component: NotApprovedCustomerManagersCustomersComponent;
  let fixture: ComponentFixture<NotApprovedCustomerManagersCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotApprovedCustomerManagersCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedCustomerManagersCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
