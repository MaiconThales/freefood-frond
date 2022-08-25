import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSelectDialogComponent } from './address-select-dialog.component';

describe('AddressSelectDialogComponent', () => {
  let component: AddressSelectDialogComponent;
  let fixture: ComponentFixture<AddressSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
