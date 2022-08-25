import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDialogRegisterComponent } from './menu-dialog-register.component';

describe('MenuDialogRegisterComponent', () => {
  let component: MenuDialogRegisterComponent;
  let fixture: ComponentFixture<MenuDialogRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDialogRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDialogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
