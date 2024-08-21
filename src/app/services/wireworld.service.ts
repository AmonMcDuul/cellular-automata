import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WireworldCell {
  state: 'EMPTY' | 'ELECTRON_HEAD' | 'ELECTRON_TAIL' | 'CONDUCTOR';
}

@Injectable({
  providedIn: 'root'
})
export class WireworldService {
  private gridSize: number = 40;
  private gridSubject: BehaviorSubject<WireworldCell[][]>;
  grid$: any;

  constructor() {
    const initialGrid: WireworldCell[][] = Array.from({ length: this.gridSize }, () =>
        Array.from({ length: this.gridSize }, () => ({ state: 'EMPTY' }))
      );
    this.gridSubject = new BehaviorSubject<WireworldCell[][]>(initialGrid);
    this.grid$ = this.gridSubject.asObservable();
  }

  initializeGrid(): void {
    const newGrid: WireworldCell[][] = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ state: 'EMPTY' }))
    );
      this.gridSubject.next(newGrid);
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.gridSubject.value;
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
    const grid: WireworldCell[][] = this.gridSubject.value.map((row, x) =>
      row.map((cell, y) => {
        switch (cell.state) {
          case 'ELECTRON_HEAD':
            return { state: 'ELECTRON_TAIL' };
          case 'ELECTRON_TAIL':
            return { state: 'CONDUCTOR' };
          case 'CONDUCTOR':
            const headCount = this.countElectronHeadNeighbors(x, y);
            return { state: headCount === 1 || headCount === 2 ? 'ELECTRON_HEAD' : 'CONDUCTOR' };
          default:
            return { state: 'EMPTY' };
        }
      })
    );

    this.gridSubject.next(grid);
  }

  private countElectronHeadNeighbors(x: number, y: number): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    return directions.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < this.gridSize && ny < this.gridSize) {
        if (this.gridSubject.value[nx][ny].state === 'ELECTRON_HEAD') {
          count++;
        }
      }
      return count;
    }, 0);
  }
}
