/*
  MVC结构
*/
class Model {
  constructor() {
    this.data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    this.score = 0
    this.dataHasZero = false
  }
  AddOne() {
    this.dataHasZero = false
    let x = Math.floor(Math.random() * 4)
    let y = Math.floor(Math.random() * 4)
    while (this.data[x][y]) {
      x = Math.floor(Math.random() * 4)
      y = Math.floor(Math.random() * 4)
      // 当data都填满时游戏结束
      this.data.map(item => {
        if (item.some(value => value === 0)) {
          this.dataHasZero = true
        }
      })
      if (!this.dataHasZero) {
        alert('you lost')
        break
      }
    }
    if (!this.data[x][y]) {
      this.data[x][y] = 2
    }
  }
  // 数组转置
  transpose(arr) {
    let newArr = arr[0].map((item, index) => {
      return arr.map(col => col[index])
    })
    return newArr
  }
  initData() {
    this.AddOne()
    this.AddOne()
  }
  moveRight() {
    // 右移并相加
    this.data = this.data.map(item => {
      let arr = item.filter(value => value > 0)
      // 向右移动
      for (let i = arr.length; i > 0; i--) {
        if (arr[i] === arr[i - 1]) {
          arr[i] *= 2
          this.score += arr[i]
          arr.splice(i - 1, 1)
        }
      }
      
      while (arr.length < 4) {
        arr.unshift(0)
      }
      return arr
    })
  }
  moveLeft() {
    // 左移并相加
    this.data = this.data.map(item => {
      let arr = item.filter(value => value > 0)
      // 向左移动
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i + 1] *= 2
          this.score += arr[i + 1]
          arr.splice(i, 1)
        }
      }
      
      while (arr.length < 4) {
        arr.push(0)
      }
      return arr
    })
  }
  moveDown() {
    this.data = this.transpose(this.data)
    // 右移并相加
    this.moveRight()
    this.data = this.transpose(this.data)
  }
  moveUp() {
    this.data = this.transpose(this.data)
    // 左移并相加
    this.moveLeft()
    this.data = this.transpose(this.data)
  }
}

class View {
  constructor() {
    this.app = this.getElement('#app')
    this.gridContainer = this.createNode('div')
    this.gridContainer.id = 'grid-container'
    this.moveLength
  }
  getElement(selector) {
    return document.querySelector(selector)
  }
  createNode(tag, className) {
    const node = document.createElement(tag)
    if (className) {
      node.classList.add(className)
    }
    return node
  }
  initView(data, score) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let grid = this.createNode('div', 'grid-cell')
        grid.id = `grid-cell-${i}-${j}`
        grid.style.backgroundColor = '#ccc0b3'
        this.gridContainer.appendChild(grid)
      }
    }
    this.app.appendChild(this.gridContainer)
    this.updateView(data, score)
    this.setMoveLength()
  }
  updateView(data, score) {
    let gridNodes = document.querySelectorAll('.grid-cell')
    // 转换为一维数组
    let arr = data.flat()
    for (let i = 0; i < 16; i++) {
      if (arr[i]) {
        let span
        if (gridNodes[i].firstElementChild) {
          gridNodes[i].removeChild(gridNodes[i].firstElementChild)
        }
        span = this.createNode('span', 'grid-cell-number')
        this.testFontSize(span, arr[i])
        span.innerHTML = arr[i]
        span.style.backgroundColor = this.setBackgroundColor(arr[i])
        span.style.color = this.setColor(arr[i])        
        gridNodes[i].appendChild(span)
      } 
      else {
        if (gridNodes[i].firstElementChild) {
          gridNodes[i].removeChild(gridNodes[i].firstElementChild)
        }
      }
    }
    // update score
    let showScore = this.getElement('#score')
    showScore.innerHTML = score
  }
  setBackgroundColor(value) {
    switch(value) {
      case 2:
        return '#eee4da'
        break
      case 4:
        return '#ede0c8'
        break
      case 8:
        return '#f2b179'
        break
      case 16:
          return '#f59563'
          break
      case 32: 
        return '#f67c5f'
        break
      case 64:
        return '#f65e3b'
        break
      case 128:
        return '#edcf72'
        break
      case 256:
        return '#edcc61'
        break
      case 512:
        return '#9c0'
        break
      case 1024:
        return '#33b5e5'
        break
      case 2048:
        return '#09c'
        break
      case 4096:
        return '#a6c'
        break
      case 8192:
        return '#93c'
        break
    }
  }
  setColor(value) {
    if (value <= 4) {
      return '#776e65'
    }
    return 'white'
  }
  setMoveLength() {
    if (window.innerWidth <= 500) {
      this.moveLength = 70
    } else {
      this.moveLength = 110
    }
  }
  AnimationRight () {
    let n = 0, count, lastGrid, isEqual = false
    this.setMoveLength()
    for (let i = 0; i < 4; i++) {
      count = 0;
      for (let j = 3; j >= 0; j--) {
        let grid = document.getElementById(`grid-cell-${i}-${j}`)
        if (grid.firstElementChild) {
          // 值相同时合并
          if (count > 0) {
            if (lastGrid.firstElementChild && grid.firstElementChild.innerHTML === lastGrid.firstElementChild.innerHTML) {
              count--
              isEqual = true
            }
          }
          n = 3 - j - count
          grid.firstElementChild.style.transform = `translateX(${this.moveLength * n}px)`            
          
          if (isEqual) {
            grid.removeChild(grid.firstElementChild)
            lastGrid.firstElementChild.innerHTML *= 2
            this.testFontSize(lastGrid.firstElementChild, lastGrid.firstElementChild.innerHTML)
          }
          count++
          lastGrid = grid
          isEqual = false
        }
      }
    }
  }
  AnimationLeft () {
    let n = 0, count, lastGrid, isEqual = false
    this.setMoveLength()

    for (let i = 0; i < 4; i++) {
      count = 0;
      for (let j = 0; j < 4; j++) {
        let grid = document.getElementById(`grid-cell-${i}-${j}`)
        if (grid.firstElementChild) {
          // 值相同时合并
          if (count > 0) {
            if (lastGrid.firstElementChild && grid.firstElementChild.innerHTML === lastGrid.firstElementChild.innerHTML) {
              count--
              isEqual = true
            }
          }
          n = j - count
          grid.firstElementChild.style.transform = `translateX(${-this.moveLength * n}px)`            
          if (isEqual) {
            grid.removeChild(grid.firstElementChild)
            lastGrid.firstElementChild.innerHTML *= 2
            this.testFontSize(lastGrid.firstElementChild, lastGrid.firstElementChild.innerHTML)
          }
          count++
          lastGrid = grid
          isEqual = false
        }
      }
    }
  }
  AnimationDown () {
    let n = 0, count, lastGrid, isEqual = false
    count = [0, 0, 0, 0]
    this.setMoveLength()
    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        let grid = document.getElementById(`grid-cell-${i}-${j}`)
        if (grid.firstElementChild) {
          // 值相同时合并
          if (count[j] > 0) {
            lastGrid = document.getElementById(`grid-cell-${i + 1}-${j}`)
            if (lastGrid.firstElementChild && grid.firstElementChild.innerHTML === lastGrid.firstElementChild.innerHTML) {
              // console.log(i, j)
              count[j]--
              isEqual = true
            }
          }
          n = 3 - i - count[j]
          grid.firstElementChild.style.transform = `translateY(${this.moveLength * n}px)`            
          if (isEqual) {
            grid.removeChild(grid.firstElementChild)
            lastGrid.firstElementChild.innerHTML *= 2
            this.testFontSize(lastGrid.firstElementChild, lastGrid.firstElementChild.innerHTML)
          }
          count[j]++
          isEqual = false
        }
      }
    }
  }
  AnimationUp () {
    let n = 0, count, lastGrid, isEqual = false
    count = [0, 0, 0, 0]
    this.setMoveLength()
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let grid = document.getElementById(`grid-cell-${i}-${j}`)
        // console.log(grid)
        if (grid.firstElementChild) {
          // 值相同时合并
          if (count[j] > 0) {
            lastGrid = document.getElementById(`grid-cell-${i - 1}-${j}`)
            if (lastGrid.firstElementChild && grid.firstElementChild.innerHTML === lastGrid.firstElementChild.innerHTML) {
              count[j]--
              isEqual = true
            }
          }
          n = i - count[j]
          grid.firstElementChild.style.transform = 
            `translateY(${-this.moveLength * n}px)`            
          if (isEqual) {
            grid.removeChild(grid.firstElementChild)
            lastGrid.firstElementChild.innerHTML *= 2

            this.testFontSize(lastGrid.firstElementChild, lastGrid.firstElementChild.innerHTML)
          }
          count[j]++
          isEqual = false
        }
      }
    }
  }
  testFontSize(node, value) {
    if (value > 512) {
      if (window.innerWidth >= 500) {
        node.style.fontSize = '40px'
      } else {
        node.style.fontSize = '24px'
      }
    } else {
      if (window.innerWidth >= 500) {
        node.style.fontSize = '60px'
      } else {
        node.style.fontSize = '36px'
      }
    }
  }
  bindEvents(controller) {
    document.addEventListener('keyup', controller.handleKeyDownRight)
    document.addEventListener('keyup', controller.handleKeyDownLeft)
    document.addEventListener('keyup', controller.handleKeyDownDown)
    document.addEventListener('keyup', controller.handleKeyDownUp)
    let btn = this.getElement('.start')
    btn.addEventListener('click', controller.handleClick)
    document.addEventListener('touchstart', controller.handleTouchStart)
    document.addEventListener('touchend', controller.handleTouchEnd)
    document.addEventListener('touchmove', controller.handleTouchmove, { passive: false })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0

    this.view.bindEvents(this)
  }
  init() {
    this.model.initData()
    this.view.initView(this.model.data, this.model.score)
  }
  handleKeyDownRight = event => {
    if (event.keyCode === 39) {
      this.view.AnimationRight()
      this.model.moveRight()
      
      let time = setTimeout(() => {
        this.view.updateView(this.model.data, this.model.score)
        this.model.AddOne()
        this.view.updateView(this.model.data, this.model.score)
        this.Test2048()
      }, 200)
    }
  }
  handleKeyDownLeft = event => {
    if (event.keyCode === 37) {
      this.view.AnimationLeft()
      this.model.moveLeft()
      
      let time = setTimeout(() => {
        this.view.updateView(this.model.data, this.model.score)
        this.model.AddOne()
        this.view.updateView(this.model.data, this.model.score)
        this.Test2048()
      }, 200)
    }
  }
  handleKeyDownUp = event => {
    if (event.keyCode === 38) {
      this.view.AnimationUp()
      this.model.moveUp()

      let time = setTimeout(() => {
        this.view.updateView(this.model.data, this.model.score)
        this.model.AddOne()
        this.view.updateView(this.model.data, this.model.score)
        this.Test2048()
      }, 200)
    }
  }
  handleKeyDownDown = event => {
    if (event.keyCode === 40) {
      this.view.AnimationDown()
      this.model.moveDown()

      let time = setTimeout(() => {
        this.view.updateView(this.model.data, this.model.score)
        this.model.AddOne()
        this.view.updateView(this.model.data, this.model.score)
        this.Test2048()
      }, 200)
    }
  }
  handleTouchStart = event => {
    this.startX = event.touches[0].pageX
    this.startY = event.touches[0].pageY
  }
  handleTouchEnd = event => {
    this.endX = event.changedTouches[0].pageX
    this.endY = event.changedTouches[0].pageY

    let deltaX = this.endX - this.startX
    let deltaY = this.endY - this.startY

    // 防止误碰触发滑动
    if (Math.abs(deltaX) < 0.2 * window.innerWidth && Math.abs(deltaY) < 0.2 * window.innerHeight) {
      return;
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      if (deltaX > 0) {
        // right
        this.view.AnimationRight()
        this.model.moveRight()
        
        let time = setTimeout(() => {
          this.view.updateView(this.model.data, this.model.score)
          this.model.AddOne()
          this.view.updateView(this.model.data, this.model.score)
          this.Test2048()
        }, 200)
      } else {
        // left
        this.view.AnimationLeft()
        this.model.moveLeft()
        
        let time = setTimeout(() => {
          this.view.updateView(this.model.data, this.model.score)
          this.model.AddOne()
          this.view.updateView(this.model.data, this.model.score)
          this.Test2048()
        }, 200)
      }
    } else {
      if (deltaY < 0) {
        // up
        this.view.AnimationUp()
        this.model.moveUp()

        let time = setTimeout(() => {
          this.view.updateView(this.model.data, this.model.score)
          this.model.AddOne()
          this.view.updateView(this.model.data, this.model.score)
          this.Test2048()
        }, 200)
      } else {
        // down
        this.view.AnimationDown()
        this.model.moveDown()

        let time = setTimeout(() => {
          this.view.updateView(this.model.data, this.model.score)
          this.model.AddOne()
          this.view.updateView(this.model.data, this.model.score)
          this.Test2048()
        }, 200)
      }
    }

  }
  handleClick = () => {
    this.start()
  }
  handleTouchmove = event => {
    event.preventDefault()
  }
  start() {
    window.location.reload()
  }
  Test2048() {
    let arr = this.model.data.flat()
    if (arr.some(v => v === 2048)) {
      alert('You win!')
    }
  }
}

// main

let app = new Controller(new Model(), new View())
app.init()

console.log('app', app)
