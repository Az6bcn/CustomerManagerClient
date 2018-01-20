import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionManagerComponent } from './section-manager.component';

describe('SectionManagerComponent', () => {
  let component: SectionManagerComponent;
  let fixture: ComponentFixture<SectionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
