import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserServiceComponent } from './register-user-service.component';

describe('RegisterUserServiceComponent', () => {
  let component: RegisterUserServiceComponent;
  let fixture: ComponentFixture<RegisterUserServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
