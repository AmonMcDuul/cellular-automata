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

  startGame(): void {
    this.stopGame();
    this.intervalId = setInterval(() => {
      this.wireworldService.nextGeneration();
    }, 200);
  }

  stopGame(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetGame(): void {
    this.stopGame();
    this.wireworldService.initializeGrid("EMPTY");
  }
    
  ngOnDestroy(): void {
    this.resetGame();
  }
}
