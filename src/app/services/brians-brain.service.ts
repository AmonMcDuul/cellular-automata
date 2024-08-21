import { Injectable } from '@angular/core';
import { BaseGridService } from './base-grid.service';

export interface BrainCell {
  state: 'ON' | 'DYING' | 'OFF';
}

@Injectable({
  providedIn: 'root'
})
export class BriansBrainService extends BaseGridService<BrainCell> {

  constructor() {
    super('OFF');
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.getGrid();
    grid[x][y].state = grid[x][y].state === 'OFF' ? 'ON' : 'OFF';
    this.gridSubject.next(grid);
  }

  nextGeneration(): void {
    const newGrid: BrainCell[][] = this.getGrid().map((row, x) =>
      row.map((cell, y) => {
        switch (cell.state) {
          case 'ON':
            return { state: 'DYING' };
          case 'DYING':
            return { state: 'OFF' };
          case 'OFF':
            const neighborsOn = this.countNeighbors(x, y, (c) => c.state === 'ON');
            return { state: neighborsOn === 2 ? 'ON' : 'OFF' };
        }
      })
    );
    this.gridSubject.next(newGrid);
  }
}
