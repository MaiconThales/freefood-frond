import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLiberateComponent } from './restaurant-liberate.component';

describe('RestaurantLiberateComponent', () => {
  let component: RestaurantLiberateComponent;
  let fixture: ComponentFixture<RestaurantLiberateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantLiberateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantLiberateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
