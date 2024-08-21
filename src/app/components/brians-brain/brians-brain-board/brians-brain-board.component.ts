import { Component, OnDestroy, OnInit } from '@angular/core';
import { BriansBrainService, BrainCell } from '../../../services/brians-brain.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brians-brain-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brians-brain-board.component.html',
  styleUrl: './brians-brain-board.component.scss',
})
export class BriansBrainBoardComponent implements OnInit, OnDestroy {
  grid: BrainCell[][] = [];
  private gridSubscription!: Subscription;
  private isMouseDown: boolean = false;

  constructor(private briansBrainService: BriansBrainService) {}

  ngOnInit(): void {
    this.gridSubscription = this.briansBrainService.grid$.subscribe((grid: BrainCell[][]) => {
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
    this.briansBrainService.toggleCellState(x, y);
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  onMouseEnter(x: number, y: number): void {
    if (this.isMouseDown) {
      this.briansBrainService.toggleCellState(x, y);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
