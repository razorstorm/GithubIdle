import 'jquery';
import Panels from './panels';
import Player from './player';
declare global {
  interface Window { hireDev: Function; makeCode: Function; }
}

jQuery(function () {
  let player: Player = new Player();
  let previousTime: Date = null;
  let panels: Panels = new Panels();
  const framesPerSecond: number = 30.0;

  const runFrame = () => {
    const currTime = new Date();
    if (previousTime === null) {
      previousTime = currTime;
      return;
    }
    const timeElapsed: number = currTime.valueOf() - previousTime.valueOf();

    player.runFrame(timeElapsed);

    panels.updateData(player);
    previousTime = currTime;
  }

  window.makeCode = () => {
    player.makeCode();
  }

  window.hireDev = () => {
    player.hireDev();
  }
  // 60 fps
  const gameClock = setInterval(runFrame, 1000 / framesPerSecond);
});