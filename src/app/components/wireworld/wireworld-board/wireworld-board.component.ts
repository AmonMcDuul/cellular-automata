import { Component, OnInit, OnDestroy } from '@angular/core';
import { WireworldService, WireworldCell } from '../../../services/wireworld.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wireworld-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wireworld-board.component.html',
  styleUrl: './wireworld-board.component.scss',
})
export class WireworldBoardComponent implements OnInit, OnDestroy {
  grid: WireworldCell[][] = [];
  private gridSubscription!: Subscription;
  private isMouseDown: boolean = false;

  constructor(private wireworldService: WireworldService) {}

  ngOnInit(): void {
    this.gridSubscription = this.wireworldService.grid$.subscribe((grid: WireworldCell[][]) => {
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
    this.wireworldService.toggleCellState(x, y);
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  onMouseEnter(x: number, y: number): void {
    if (this.isMouseDown) {
      this.wireworldService.toggleCellState(x, y);
    }
  }
}
