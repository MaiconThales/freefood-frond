import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPainelTwoComponent } from './dashboard-painel-two.component';

describe('DashboardPainelTwoComponent', () => {
  let component: DashboardPainelTwoComponent;
  let fixture: ComponentFixture<DashboardPainelTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPainelTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPainelTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
