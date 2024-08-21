import { Injectable } from '@angular/core';
import { BaseGridService } from './base-grid.service';

export interface Cell {
  state: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService extends BaseGridService<Cell> {

  constructor() {
    super(false);
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.getGrid();
    console.log(grid[x][y].state)
    grid[x][y].state = !grid[x][y].state;
    this.gridSubject.next(grid);
  }

  nextGeneration(): void {
    const newGrid: Cell[][] = this.getGrid().map((row, x) =>
      row.map((cell, y) => {
        const aliveNeighbors = this.countNeighbors(x, y, (c) => c.state);
        return { state: cell.state ? aliveNeighbors === 2 || aliveNeighbors === 3 : aliveNeighbors === 3 };
      })
    );
    this.gridSubject.next(newGrid);
  }
}
