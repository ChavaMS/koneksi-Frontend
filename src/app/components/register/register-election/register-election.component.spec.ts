import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterElectionComponent } from './register-election.component';

describe('RegisterElectionComponent', () => {
  let component: RegisterElectionComponent;
  let fixture: ComponentFixture<RegisterElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
