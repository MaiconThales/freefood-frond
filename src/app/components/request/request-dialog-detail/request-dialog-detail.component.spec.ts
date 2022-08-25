import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogDetailComponent } from './request-dialog-detail.component';

describe('RequestDialogDetailComponent', () => {
  let component: RequestDialogDetailComponent;
  let fixture: ComponentFixture<RequestDialogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDialogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDialogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
