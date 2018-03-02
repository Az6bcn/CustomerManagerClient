import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraManagerDashboardComponent } from './genera-manager-dashboard.component';

describe('GeneraManagerDashboardComponent', () => {
  let component: GeneraManagerDashboardComponent;
  let fixture: ComponentFixture<GeneraManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
