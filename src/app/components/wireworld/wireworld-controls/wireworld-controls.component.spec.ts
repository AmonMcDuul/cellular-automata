import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireworldControlsComponent } from './wireworld-controls.component';

describe('WireworldControlsComponent', () => {
  let component: WireworldControlsComponent;
  let fixture: ComponentFixture<WireworldControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WireworldControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireworldControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
