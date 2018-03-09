import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Hammer } from 'ionic-angular/gestures/hammer';
import { Store } from '@ngrx/store';
import * as actions from '../store/app.actions';

@Component({
  selector: 'page-home',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        2048
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content no-bounce>
    <div class="box-game-over" text-center *ngIf="($app | async).gameover !== null">
      <h1>Game over!</h1>
      <h4 id="score">Final score: {{($app | async).points}}</h4>
      <button ion-button (click)="startNewGame()">New Game</button>
    </div>
    <h3 id="score">Score: {{($app | async).points}}</h3>
    <div id="game-grid" class="game-grid">
      <ng-template ngFor let-item [ngForOf]="($app | async).grid" let-i="index">
        <div [ngClass]="['box', 'box-' + i, 'digit-' + item]">
          {{item}}
        </div>
      </ng-template>
    </div>
  </ion-content>
`
})
export class HomeContainer {
  private grid: Array<Number> = [];
  private hammer: any = Hammer;
  public lastDirection;
  public $app: any;

  constructor(public navCtrl: NavController, public store: Store<any>) {
    this.grid = new Array(16).fill(0);
    this.$app = this.store.select('app');
  }

  ngAfterViewInit() {
    this.setupSwipeGesture();
  }

  startNewGame() {
    this.store.dispatch(new actions.NewGameAction());
  }

  setupSwipeGesture() {
    let gesture = this.hammer(document.getElementById('game-grid'), {
      direction: this.hammer.DIRECTION_ALL
    });
    gesture.get('pan').set({ direction: this.hammer.DIRECTION_ALL });
    gesture.on('panleft panright panup pandown', e => {
      this.setDirection(e.direction);
    });
    gesture.on('panend', e => {
      this.dispatchSwipeAction(this.lastDirection);
    });
  }

  dispatchSwipeAction(direction: string) {
    switch (direction) {
      case 'left':
        this.store.dispatch(new actions.SwipeLeftAction());
        break;
      case 'right':
        this.store.dispatch(new actions.SwipeRightAction());
        break;
      case 'up':
        this.store.dispatch(new actions.SwipeUpAction());
        break;
      case 'down':
        this.store.dispatch(new actions.SwipeDownAction());
        break;
    }
  }

  setDirection(direction: any): void {
    switch (direction) {
      case 4:
        this.lastDirection = 'right';
        break;
      case 2:
        this.lastDirection = 'left';
        break;
      case 8:
        this.lastDirection = 'up';
        break;
      case 16:
        this.lastDirection = 'down';
        break;
    }
  }

}
