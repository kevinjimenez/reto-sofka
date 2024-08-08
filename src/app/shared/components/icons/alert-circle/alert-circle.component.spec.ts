import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCircleComponent } from './alert-circle.component';

describe('AlertCircleComponent', () => {
  let component: AlertCircleComponent;
  let fixture: ComponentFixture<AlertCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
