import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserProductsComponent } from './register-user-products.component';

describe('RegisterUserProductsComponent', () => {
  let component: RegisterUserProductsComponent;
  let fixture: ComponentFixture<RegisterUserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
