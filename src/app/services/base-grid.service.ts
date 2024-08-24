import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cell {
  state: any;
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseGridService<T extends Cell> {
  protected gridSize: number = 33;
  protected gridSubject: BehaviorSubject<T[][]>;
  grid$: any;

  constructor(initialState: T['state']) {
    const initialGrid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ state: initialState } as T))
    );
    this.gridSubject = new BehaviorSubject<T[][]>(initialGrid);
    this.grid$ = this.gridSubject.asObservable();
  }

  initializeGrid(initialState: T['state']): void {
    const newGrid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ state: initialState } as T))
    );
    this.gridSubject.next(newGrid);
  }

  getGrid(): T[][] {
    return this.gridSubject.value;
  }

  abstract toggleCellState(x: number, y: number): void;

  abstract nextGeneration(): void;

  protected countNeighbors(x: number, y: number, predicate: (cell: T) => boolean): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    return directions.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < this.gridSize && ny < this.gridSize && predicate(this.getGrid()[nx][ny])) {
        count++;
      }
      return count;
    }, 0);
  }
}