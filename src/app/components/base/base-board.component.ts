import { OnDestroy, OnInit, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export abstract class BaseBoardComponent<T> implements OnInit, OnDestroy {
  grid: T[][] = [];
  private gridSubscription!: Subscription;
  protected isMouseDown: boolean = false;

  constructor(protected gameService: any) {}

  ngOnInit(): void {
    this.gridSubscription = this.gameService.grid$.subscribe((grid: T[][]) => {
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
