import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceIsNiceScreenComponent } from './price-is-nice-screen.component';

describe('PriceIsNiceScreenComponent', () => {
  let component: PriceIsNiceScreenComponent;
  let fixture: ComponentFixture<PriceIsNiceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceIsNiceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceIsNiceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
