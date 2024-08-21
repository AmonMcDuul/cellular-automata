import { Component } from '@angular/core';
import { WireworldService } from '../../../services/wireworld.service';

@Component({
  selector: 'app-wireworld-controls',
  standalone: true,
  templateUrl: './wireworld-controls.component.html',
  styleUrl: './wireworld-controls.component.scss',
})
export class WireworldControlsComponent {
  private intervalId: any;

  constructor(private wireworldService: WireworldService) {}

  startSimulation(): void {
    this.stopSimulation();
    this.intervalId = setInterval(() => {
      this.wireworldService.nextGeneration();
    }, 200);
  }

  stopSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetSimulation(): void {
    this.stopSimulation();
    this.wireworldService.initializeGrid("EMPTY");
  }
}
