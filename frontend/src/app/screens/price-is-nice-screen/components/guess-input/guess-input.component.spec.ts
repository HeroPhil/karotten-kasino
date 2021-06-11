import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessInputComponent } from './guess-input.component';

describe('GuessInputComponent', () => {
  let component: GuessInputComponent;
  let fixture: ComponentFixture<GuessInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
