import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BrainCell {
  state: 'ON' | 'DYING' | 'OFF';
}

@Injectable({
  providedIn: 'root'
})
export class BriansBrainService {
  private gridSize: number = 40;
  private gridSubject: BehaviorSubject<BrainCell[][]>;
  grid$: any;

  constructor() {
    const initialGrid: BrainCell[][] = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ state: 'OFF' }))
    );
    this.gridSubject = new BehaviorSubject<BrainCell[][]>(initialGrid);
    this.grid$ = this.gridSubject.asObservable();

  }

  initializeGrid(): void {
    const newGrid: BrainCell[][] = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ state: 'OFF' }))
    );
    this.gridSubject.next(newGrid);
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.gridSubject.value;
    grid[x][y].state = grid[x][y].state === 'OFF' ? 'ON' : 'OFF';
    this.gridSubject.next(grid);
  }

  nextGeneration(): void {
    const currentGrid = this.gridSubject.value;
    const newGrid: BrainCell[][] = currentGrid.map((row, x) =>
      row.map((cell, y) => {
        switch (cell.state) {
          case 'ON':
            return { state: 'DYING' };
          case 'DYING':
            return { state: 'OFF' };
          case 'OFF':
            const neighborsOn = this.countNeighborsOn(x, y);
            return { state: neighborsOn === 2 ? 'ON' : 'OFF' };
        }
      })
    );
    this.gridSubject.next(newGrid);
  }

  private countNeighborsOn(x: number, y: number): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < this.gridSize && ny < this.gridSize) {
        if (this.gridSubject.value[nx][ny].state === 'ON') {
          count++;
        }
      }
      return count;
    }, 0);
  }
}
