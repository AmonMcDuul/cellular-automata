import { Component } from '@angular/core';
import { GameBoardComponent } from "../game-of-life/game-board/game-board.component";
import { GameControlsComponent } from "../game-of-life/game-controls/game-controls.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameBoardComponent, GameControlsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  gameOfLife: boolean = false;

  setGameOfLife(){
    this.gameOfLife = true;
  }
}
