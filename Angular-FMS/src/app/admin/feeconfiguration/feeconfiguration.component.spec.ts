import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeconfigurationComponent } from './feeconfiguration.component';

describe('FeeconfigurationComponent', () => {
  let component: FeeconfigurationComponent;
  let fixture: ComponentFixture<FeeconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeconfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
