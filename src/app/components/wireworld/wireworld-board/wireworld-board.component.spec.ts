import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireworldBoardComponent } from './wireworld-board.component';

describe('WireworldBoardComponent', () => {
  let component: WireworldBoardComponent;
  let fixture: ComponentFixture<WireworldBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WireworldBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireworldBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
