function saveScore(name, time, moves) {
  let calcScore = 1000 - moves * 10 - time * 2;
  if (calcScore < 0) {
    calcScore = 0;
  }

  let oldScores = JSON.parse(localStorage.getItem("myGameScores"));

  if (oldScores === null) {
    oldScores = [];
  }

  let playerScore = {
    playerName: name,
    playerTime: time,
    playerMoves: moves,
    playerScore: calcScore,
  };

  oldScores.push(playerScore);
  oldScores.sort(function (a, b) {
    return b.playerScore - a.playerScore;
  });

  let topFive = oldScores.slice(0, 5);
  localStorage.setItem("myGameScores", JSON.stringify(topFive));
}
function displayScores() {
  let scoresList = document.getElementById("scores-list");
  let savedScores = JSON.parse(localStorage.getItem("myGameScores"));

  if (savedScores === null || savedScores.length === 0) {
    scoresList.innerHTML = "<li>لا توجد نتائج مسجلة بعد</li>";
    return;
  }
  scoresList.innerHTML = "";
  for (let i = 0; i < savedScores.length; i++) {
    let item = document.createElement("li");
    item.textContent =
      savedScores[i].playerName +
      " - " +
      savedScores[i].playerScore +
      " pts (" +
      savedScores[i].playerMoves +
      " moves)";
    scoresList.appendChild(item);
  }
}
displayScores();
