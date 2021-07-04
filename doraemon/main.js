import cssString from './css.js'

const player = {
  id: undefined,
  time: 100,
  ui: {
    showCss: document.querySelector('.show-css'),
    cssContent: document.querySelector('.css-content')
  },
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key]
        document.querySelector(key).onclick = player[value]
      }
    }
  },
  n: 1,
  init: () => {
    player.ui.showCss.innerText = cssString.substr(0, player.n)
    player.ui.cssContent.innerHTML = cssString.substr(0, player.n)
    player.bindEvents()
    player.play()
  },
  run: () => {
    player.n += 1
    if (player.n > cssString.length) {
      window.clearInterval(player.id)
      return
    }
    player.ui.showCss.innerText = cssString.substr(0, player.n)
    player.ui.cssContent.innerHTML = cssString.substr(0, player.n)
    // css代码滚动
    player.ui.showCss.scrollTop = player.ui.showCss.scrollHeight
  },
  play: () => {
    window.clearInterval(player.id)
    player.id = setInterval(player.run, player.time)
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  slow: () => {
    player.pause()
    player.time = 150
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 75
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  }
}

player.init()
