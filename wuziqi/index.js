// 获取节点
let chess = document.querySelector('.chess')
let options = document.querySelector('.options')
let result = document.querySelector('.result')
let restart = document.querySelector('.restart')
let mode1 = document.querySelector('.mode1')
let mode2 = document.querySelector('.mode2')

let context = chess.getContext('2d')
context.strokeStyle = '#b9b9b9'

// 适配移动端
let gridLength, radius
if (window.innerWidth < 500) {
  chess.width = 300
  chess.height = 300
  gridLength = 20
  radius = 8
} else {
  chess.width = 450
  chess.height = 450
  gridLength = 30
  radius = 13
}
const startPos  = (chess.width - gridLength * 14) / 2
const endPos = chess.width - startPos

let mode = 0  // 游戏模式，1为对抗AI，2为玩家对战
mode1.onclick = chooseMode
mode2.onclick = chooseMode

window.onload = function () {
  drawChessBoard()
}

// 三维数组wins存储所有赢法
let wins = []
let count = 0;
[wins, count] = createWinMethods(wins, count)

// 二维数组chessBoard代表棋盘，0表示没有棋子
let chessBoard = [...Array(15)].map(() => Array(15).fill(0))
let player = true // 玩家的回合
let gameOver = false
// 统计玩家和Ai棋子赢法编号
let playerWin = Array(count).fill(0)
let AiWin = Array(count).fill(0)

// 玩家点击棋盘下棋
chess.onclick = function (e) {
  if (gameOver || mode === 0) {
    return;
  }
  // console.log(e)
  // 确定点击处在第几行列
  let i = Math.floor(e.offsetX / gridLength)
  let j = Math.floor(e.offsetY / gridLength)

  // 落子
  PutOneStep(i, j, playerWin)
  
  // mode1轮到AI自动下棋，mode2玩家2点击棋盘下棋
  if (mode === 1) {
    computerAi(i, j, AiWin)
  } else {
    if (chessBoard[i][j] === 0 && !player) {
      computerAi(i, j, AiWin)
    }
  }
}

function chooseMode(e) {
  mode = +e.target.value
  options.classList.add('disappear')
}

function drawChessBoard() {
  for (let i = 0; i < 15; i++) {
    context.moveTo(startPos, startPos + i * gridLength)
    context.lineTo(endPos, startPos + i * gridLength)
    context.stroke()
    context.moveTo(startPos + i * gridLength, startPos)
    context.lineTo(startPos + i * gridLength, endPos)
    context.stroke()
  }
}

function createWinMethods(wins, count) {
  for (let i = 0; i < 15; i++) {
    wins[i] = []
    for (let j = 0; j < 15; j++) {
      wins[i][j] = []
    }
  }
  // 横线赢法
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
      for (let k = 0; k < 5; k++) {
        wins[j + k][i][count] = true
      }
      count += 1
    }
  }
  // 竖线赢法
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
      for (let k = 0; k < 5; k++) {
        wins[i][j + k][count] = true
      }
      count += 1
    }
  }
  // 右下斜线赢法
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      for (let k = 0; k < 5; k++) {
        wins[i + k][j + k][count] = true
      }
      count += 1
    }
  }
  // 左下斜线赢法
  for (let i = 4; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
      for (let k = 0; k < 5; k++) {
        wins[i - k][j + k][count] = true
      }
      count += 1
    }
  }

  return [wins, count]
}
// 画一个棋子
function oneStep(i, j) {
  context.beginPath()
  context.arc(i * gridLength + startPos, j * gridLength + startPos, radius, 0, 2 * Math.PI)
  context.stroke()
  context.fillStyle = player ? 'black' : 'white'
  context.fill()
}

function computerAi(i, j, AiWin) {
  if (gameOver || player) {
    return;
  }
  let [x, y] = [i, j]
  
  if (mode === 1) {
    [x,y] = algorithm()
  }
  PutOneStep(x, y, AiWin)
}

function PutOneStep(x, y, winArr) {
  if (chessBoard[x][y] === 0) {
    oneStep(x, y)
    chessBoard[x][y] = 1

    // console.log(winArr)
    // 落子后找到包含此位置的对应赢法记录并判断是否获胜，k为一种赢法编号
    for (let k = 0; k < count; k++) {
      if (wins[x][y][k]) {
        winArr[k] += 1
        if (winArr[k] === 5) {
          result.innerHTML = player ? '黑子获胜！' : '白子获胜！'
          gameOver = true;
          restart.classList.add('show');
          winArr = [];
        }
      }
    }

    if (!gameOver) {
      player = !player
    }
  }
}

// 计算AI在哪里落子
function algorithm() {
  let playerScore = [...Array(15)].map(() => Array(15).fill(0))
  let AiScore = [...Array(15)].map(() => Array(15).fill(0))
  let max = 0, x = 0, y = 0

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (chessBoard[i][j] === 0) {
        // 遍历空白子
        for (let k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            // 筛选赢法编号
            if (playerWin[k] === 1) {
              playerScore[i][j] += 200
            } else if (playerWin[k] === 2) {
              playerScore[i][j] += 400
            } else if (playerWin[k] === 3) {
              playerScore[i][j] += 2000
            } else if (playerWin[k] === 4) {
              playerScore[i][j] += 10000
            }

            if (AiWin[k] === 1) {
              AiScore[i][j] += 220
            } else if (AiWin[k] === 2) {
              AiScore[i][j] += 420
            } else if (AiWin[k] === 3) {
              AiScore[i][j] += 2200
            } else if (AiWin[k] === 4) {
              AiScore[i][j] += 20000
            }
          }
        }

        if (playerScore[i][j] > max) {
          max = playerScore[i][j]
          x = i
          y = j
        } else if (playerScore[i][j] === max) {
          if (AiScore[i][j] > max) {
            max = AiScore[i][j]
            x = i
            y = j
          }
        }
  
        if (AiScore[i][j] > max) {
          max = AiScore[i][j]
          x = i
          y = j
        } else if (AiScore[i][j] === max) {
          if (playerScore[i][j] > max) {
            max = playerScore[i][j]
            x = i
            y = j
          }
        }
      }
    }
  }
  // console.log(playerScore)
  // console.log(AiScore)
  return [x, y]
}

function again() {
  window.location.reload()
}
