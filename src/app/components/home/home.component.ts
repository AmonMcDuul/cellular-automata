import { Component } from '@angular/core';
import { GameBoardComponent } from "../game-of-life/game-board/game-board.component";
import { GameControlsComponent } from "../game-of-life/game-controls/game-controls.component";
import { BriansBrainBoardComponent } from '../brians-brain/brians-brain-board/brians-brain-board.component';
import { BriansBrainControlsComponent } from '../brians-brain/brians-brain-controls/brians-brain-controls.component';
import { CommonModule } from '@angular/common';
import { WireworldControlsComponent } from "../wireworld/wireworld-controls/wireworld-controls.component";
import { WireworldBoardComponent } from "../wireworld/wireworld-board/wireworld-board.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GameBoardComponent,
    GameControlsComponent,
    BriansBrainBoardComponent,
    BriansBrainControlsComponent,
    WireworldControlsComponent,
    WireworldBoardComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  gameOfLife: boolean = true;
  briansBrain: boolean = false;
  wireworld: boolean = false;

  setGameOfLife() {
    this.gameOfLife = true;
    this.briansBrain = false;
    this.wireworld = false;
  }

  setBriansBrain() {
    this.gameOfLife = false;
    this.briansBrain = true;
    this.wireworld = false;
  }

  setWireworld() {
    this.gameOfLife = false;
    this.briansBrain = false;
    this.wireworld = true;
  }
}