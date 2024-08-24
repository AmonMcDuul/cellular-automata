import { Component } from '@angular/core';
import { BriansBrainService } from '../../../services/brians-brain.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brians-brain-controls',
  standalone: true,
  imports: [],
  templateUrl: './brians-brain-controls.component.html',
  styleUrl: './brians-brain-controls.component.scss',
})
export class BriansBrainControlsComponent {
  private intervalId: any;

  constructor(private briansBrainService: BriansBrainService) {}

  startGame(): void {
    this.stopGame();
    this.intervalId = setInterval(() => {
      this.briansBrainService.nextGeneration();
    }, 300);
  }

  stopGame(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetGame(): void {
    this.stopGame();
    this.briansBrainService.initializeGrid("OFF");
  }
    
  ngOnDestroy(): void {
    this.resetGame();
  }
}
