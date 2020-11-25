import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsResultComponent } from './jobs-result.component';

describe('JobsResultComponent', () => {
  let component: JobsResultComponent;
  let fixture: ComponentFixture<JobsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
