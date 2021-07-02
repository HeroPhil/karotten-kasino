import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessInformationComponent } from './guess-information.component';

describe('GuessInformationComponent', () => {
  let component: GuessInformationComponent;
  let fixture: ComponentFixture<GuessInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
