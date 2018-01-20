import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListViewComponent } from './table-list-view.component';

describe('TableListViewComponent', () => {
  let component: TableListViewComponent;
  let fixture: ComponentFixture<TableListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
