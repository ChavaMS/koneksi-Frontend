import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserJobsComponent } from './register-user-jobs.component';

describe('RegisterUserJobsComponent', () => {
  let component: RegisterUserJobsComponent;
  let fixture: ComponentFixture<RegisterUserJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
