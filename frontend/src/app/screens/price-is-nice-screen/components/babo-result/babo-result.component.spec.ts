import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaboResultComponent } from './babo-result.component';

describe('BaboResultComponent', () => {
  let component: BaboResultComponent;
  let fixture: ComponentFixture<BaboResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaboResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaboResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
