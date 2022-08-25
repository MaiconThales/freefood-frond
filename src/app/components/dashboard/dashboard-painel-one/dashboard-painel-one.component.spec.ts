import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPainelOneComponent } from './dashboard-painel-one.component';

describe('DashboardPainelOneComponent', () => {
  let component: DashboardPainelOneComponent;
  let fixture: ComponentFixture<DashboardPainelOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPainelOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPainelOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
