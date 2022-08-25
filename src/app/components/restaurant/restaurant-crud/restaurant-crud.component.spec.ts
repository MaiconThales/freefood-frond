import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCrudComponent } from './restaurant-crud.component';

describe('RestaurantCrudComponent', () => {
  let component: RestaurantCrudComponent;
  let fixture: ComponentFixture<RestaurantCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
