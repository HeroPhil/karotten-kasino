import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPreviewSliderComponent } from './content-preview-slider.component';

describe('ContentPreviewSliderComponent', () => {
  let component: ContentPreviewSliderComponent;
  let fixture: ComponentFixture<ContentPreviewSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPreviewSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPreviewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
