import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriansBrainBoardComponent } from './brians-brain-board.component';

describe('BriansBrainBoardComponent', () => {
  let component: BriansBrainBoardComponent;
  let fixture: ComponentFixture<BriansBrainBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriansBrainBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriansBrainBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
