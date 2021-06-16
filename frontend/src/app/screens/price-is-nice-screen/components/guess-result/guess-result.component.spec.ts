import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessResultComponent } from './guess-result.component';

describe('GuessResultComponent', () => {
  let component: GuessResultComponent;
  let fixture: ComponentFixture<GuessResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
