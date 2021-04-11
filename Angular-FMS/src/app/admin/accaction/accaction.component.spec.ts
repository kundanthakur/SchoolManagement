import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccactionComponent } from './accaction.component';

describe('AccactionComponent', () => {
  let component: AccactionComponent;
  let fixture: ComponentFixture<AccactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
