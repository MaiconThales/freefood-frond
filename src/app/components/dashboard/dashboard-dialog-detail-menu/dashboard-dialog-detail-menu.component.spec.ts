import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogDetailMenuComponent } from './dashboard-dialog-detail-menu.component';

describe('DashboardDialogDetailMenuComponent', () => {
  let component: DashboardDialogDetailMenuComponent;
  let fixture: ComponentFixture<DashboardDialogDetailMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDialogDetailMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDialogDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
