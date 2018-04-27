const activeWin = require('active-win')
// const desktopIdle = require('desktop-idle')
const colors = require('colors')
const moment = require('moment')

const MAX_INTERVAL = 60000

let aLast = ''
let tLast = 0
let tUpdate = null

const next = () => {
  // let n = desktopIdle.getIdleTime();
  // if (n >= 5) {
  //   update(null, n * 1000)
  //   handle = setTimeout(next, (n + 1) * 1000)
  // } else {
    activeWin().then(w => {
      update(w.owner.name);

      handle = setTimeout(next, Math.min(tLast - 500, 60000))
    })
  // }
}

const update = (a) => {
  const tOld = tUpdate
  tUpdate = moment()
  
  if (tOld === null) return

  const t = tUpdate.diff(tOld)

  if (a === aLast) {
    tLast += t

  } else {
    console.log(moment().format('HH:mm:ss').yellow,
        tLast === 0 ? 'Started' : `${Math.round(tLast / 1000)}s`.grey, '→', a.cyan)
    aLast = a
    tLast = 1000
  }
}

let handle
next()