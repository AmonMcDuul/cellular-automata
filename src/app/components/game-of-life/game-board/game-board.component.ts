import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameOfLifeService } from '../../../services/game-of-life.service';
import { Cell } from '../../../models/cell.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})

export class GameBoardComponent implements OnInit {
  grid: Cell[][] = [];
  private gridSubscription!: Subscription;
  private isMouseDown: boolean = false; 

  constructor(private gameService: GameOfLifeService) {}

  ngOnInit(): void {
    this.gridSubscription = this.gameService.grid$.subscribe((grid: Cell[][]) => {
      this.grid = grid;
    });
  }

  ngOnDestroy(): void {
    if (this.gridSubscription) {
      this.gridSubscription.unsubscribe();
    }
  }

  onMouseDown(x: number, y: number): void {
    this.isMouseDown = true;
    this.gameService.toggleCellState(x, y);
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  onMouseEnter(x: number, y: number): void {
    if (this.isMouseDown) {
      this.gameService.toggleCellState(x, y);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}