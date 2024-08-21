import { Injectable } from '@angular/core';
import { BaseGridService } from './base-grid.service';

export interface WireworldCell {
  state: 'EMPTY' | 'ELECTRON_HEAD' | 'ELECTRON_TAIL' | 'CONDUCTOR';
}

@Injectable({
  providedIn: 'root'
})
export class WireworldService extends BaseGridService<WireworldCell> {

  constructor() {
    super('EMPTY'); 
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.getGrid();
    const cell = grid[x][y];

    switch (cell.state) {
      case 'EMPTY':
        cell.state = 'CONDUCTOR';
        break;
      case 'CONDUCTOR':
        cell.state = 'ELECTRON_HEAD';
        break;
      case 'ELECTRON_HEAD':
        cell.state = 'ELECTRON_TAIL';
        break;
      case 'ELECTRON_TAIL':
        cell.state = 'EMPTY';
        break;
    }

    this.gridSubject.next(grid);
  }

  nextGeneration(): void {
    const newGrid: WireworldCell[][] = this.getGrid().map((row, x) =>
      row.map((cell, y) => {
        switch (cell.state) {
          case 'ELECTRON_HEAD':
            return { state: 'ELECTRON_TAIL' };
          case 'ELECTRON_TAIL':
            return { state: 'CONDUCTOR' };
          case 'CONDUCTOR':
            const headCount = this.countNeighbors(x, y, (c) => c.state === 'ELECTRON_HEAD');
            return { state: headCount === 1 || headCount === 2 ? 'ELECTRON_HEAD' : 'CONDUCTOR' };
          default:
            return { state: 'EMPTY' };
        }
      })
    );

    this.gridSubject.next(newGrid);
  }
}
