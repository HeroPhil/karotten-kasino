import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaboInputComponent } from './babo-input.component';

describe('BaboInputComponent', () => {
  let component: BaboInputComponent;
  let fixture: ComponentFixture<BaboInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaboInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaboInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
