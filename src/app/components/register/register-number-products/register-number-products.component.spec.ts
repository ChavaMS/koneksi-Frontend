import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNumberProductsComponent } from './register-number-products.component';

describe('RegisterNumberProductsComponent', () => {
  let component: RegisterNumberProductsComponent;
  let fixture: ComponentFixture<RegisterNumberProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNumberProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNumberProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
