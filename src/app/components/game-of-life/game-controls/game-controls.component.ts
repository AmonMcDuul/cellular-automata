import { Component } from '@angular/core';
import { GameOfLifeService } from '../../../services/game-of-life.service';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})

export class GameControlsComponent {
  private intervalId: any;

  constructor(private gameService: GameOfLifeService) {}

  startGame(): void {
    this.stopGame();
    this.intervalId = setInterval(() => {
      this.gameService.nextGeneration();
    }, 300); 
  }

  stopGame(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetGame(): void {
    this.stopGame();
    this.gameService.initializeGrid(false);
  }
  
  ngOnDestroy(): void {
    this.resetGame();
  }
}
