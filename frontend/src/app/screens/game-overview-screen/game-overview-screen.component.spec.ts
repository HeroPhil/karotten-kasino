import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverviewScreenComponent } from './game-overview-screen.component';

describe('GameOverviewScreenComponent', () => {
  let component: GameOverviewScreenComponent;
  let fixture: ComponentFixture<GameOverviewScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameOverviewScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverviewScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
