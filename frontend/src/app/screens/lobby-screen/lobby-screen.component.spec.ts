import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyScreenComponent } from './lobby-screen.component';

describe('LobbyScreenComponent', () => {
  let component: LobbyScreenComponent;
  let fixture: ComponentFixture<LobbyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
