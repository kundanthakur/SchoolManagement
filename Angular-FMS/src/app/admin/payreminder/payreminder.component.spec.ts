import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayreminderComponent } from './payreminder.component';

describe('PayreminderComponent', () => {
  let component: PayreminderComponent;
  let fixture: ComponentFixture<PayreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayreminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
