import 'jquery';
declare global {
  interface Window { hireDev: Function; makeCode: Function; }
}

jQuery(function () {
  let previousTime: Date = null;
  let locPerCommit = [10, 50];
  let myLocPerCommit = [10, 50];
  let commits = 0;
  let loc = 0;
  let secondsPerCommit = 10.0;
  let clicksPerCommit = 10.0;
  let commitsPerClick = 1.0 / clicksPerCommit;
  let commitsPerSecond = 1.0 / secondsPerCommit;
  let commitsPerMillisecond = commitsPerSecond / 1000.0;
  let commitProgress = 0;
  let prevCommitLoc = 0;
  let developers = 1;
  let developerCost = 300;

  let myCommitProgress = 0;
  const locDisplay = $("#locDisplay");
  const commitsDisplay = $("#commitsDisplay");
  const developersDisplay = $("#developersDisplay");
  const prevCommitLocDisplay = $("#prevCommitLocDisplay");
  const commitProgressBar = $("#commitProgress");
  const myCommitProgressDisplay = $("#myCommitProgress");
  const secondsPerCommitDisplay = $("#secondsPerCommit");

  const makeCodeButton = $("#makeCodeButton");
  const hireDevsButton = $("#hireDevsButton");

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const runFrame = () => {
    const currTime = new Date();
    if (previousTime === null) {
      previousTime = currTime;
      return;
    }
    const timeElapsed: number = currTime.valueOf() - previousTime.valueOf();
    const commitIncrementalProgress = commitsPerMillisecond * timeElapsed;
    commitProgress += commitIncrementalProgress * developers;

    if (commitProgress >= 1.0) {
      commitProgress -= 1.0;
      commits += 1;
      prevCommitLoc = getRandomInt(locPerCommit[0], locPerCommit[1]);
      loc += prevCommitLoc
    }

    updateData();
    previousTime = currTime;
  }

  const updateData = () => {
    locDisplay.text(loc);
    if (prevCommitLoc > 0) {
      prevCommitLocDisplay.text(" (+" + prevCommitLoc + ")");
    }
    commitsDisplay.text(commits);
    secondsPerCommitDisplay.text(secondsPerCommit);
    developersDisplay.text(developers);

    const commitProgressPercent = commitProgress * 100.0;
    commitProgressBar.css({
      width: commitProgressPercent + "%"
    });

    commitProgressBar.text(commitProgressPercent.toFixed(2) + "%");

    const myCommitProgressPercent = myCommitProgress * 100.0;
    myCommitProgressDisplay.css({
      width: myCommitProgressPercent + "%"
    });

    myCommitProgressDisplay.text(myCommitProgressPercent.toFixed(2) + "%");

    if(loc >= developerCost) {
      hireDevsButton.prop("disabled", false);
    } else {
      hireDevsButton.prop("disabled", true);
    }
  }

  window.makeCode = () => {
    myCommitProgress += commitsPerClick;
    if (myCommitProgress >= 1.0) {
      myCommitProgress -= 1.0;
      commits += 1;
      prevCommitLoc = getRandomInt(myLocPerCommit[0], myLocPerCommit[1]);
      loc += prevCommitLoc
    }
  }

  window.hireDev = () => {
    if(loc >= developerCost) {
      loc -= developerCost;
      developers++;
    }
  }



  // makeCodeButton.click = makeCode;
  console.log(makeCodeButton);
  // 60 fps
  const gameClock = setInterval(runFrame, 1000 / 60.0);
});