import { Directive } from '@angular/core';

@Directive()
export abstract class BaseControlsComponent {
  protected intervalId: any;

  constructor(protected gameService: any) {}

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
    this.gameService.initializeGrid();
  }
      
  ngOnDestroy(): void {
    this.resetGame();
  }
}
