import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriansBrainControlsComponent } from './brians-brain-controls.component';

describe('BriansBrainControlsComponent', () => {
  let component: BriansBrainControlsComponent;
  let fixture: ComponentFixture<BriansBrainControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriansBrainControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriansBrainControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
