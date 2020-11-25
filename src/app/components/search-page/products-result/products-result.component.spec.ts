import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsResultComponent } from './products-result.component';

describe('ProductsResultComponent', () => {
  let component: ProductsResultComponent;
  let fixture: ComponentFixture<ProductsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
