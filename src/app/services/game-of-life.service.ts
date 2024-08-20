// src/app/services/game.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {
  private gridSize: number = 40;
  private gridSubject: BehaviorSubject<Cell[][]>;

  grid$: any;

  constructor() {
    const initialGrid = Array.from({ length: this.gridSize }, () => 
      Array.from({ length: this.gridSize }, () => ({ isAlive: false }))
    );
    this.gridSubject = new BehaviorSubject<Cell[][]>(initialGrid);
    this.grid$ = this.gridSubject.asObservable();
  }

  initializeGrid(): void {
    const newGrid = Array.from({ length: this.gridSize }, () => 
      Array.from({ length: this.gridSize }, () => ({ isAlive: false }))
    );
    this.gridSubject.next(newGrid);  
  }

  getGrid(): Cell[][] {
    return this.gridSubject.value;
  }

  toggleCellState(x: number, y: number): void {
    const grid = this.getGrid();
    grid[x][y].isAlive = !grid[x][y].isAlive;
    this.gridSubject.next(grid);  
  }

  nextGeneration(): void {
    const newGrid = this.getGrid().map((row, x) => 
      row.map((cell, y) => {
        const aliveNeighbors = this.countAliveNeighbors(x, y);
        const isAlive = cell.isAlive;
        return { isAlive: isAlive ? aliveNeighbors === 2 || aliveNeighbors === 3 : aliveNeighbors === 3 };
      })
    );
    console.log('New Generation:', newGrid); 
    this.gridSubject.next(newGrid); 
  }
  
  private countAliveNeighbors(x: number, y: number): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    return directions.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < this.gridSize && ny < this.gridSize && this.getGrid()[nx][ny].isAlive) {
        count++;
      }
      return count;
    }, 0);
  }
}
