const activeWin = require('active-win')
// const desktopIdle = require('desktop-idle')
const colors = require('colors')
const moment = require('moment')

let aLast = '';
let aMost = '';
let tLast = 0;
let tMost = 0;
let tUpdate = null;

const next = (reset = false) => {
  // let n = desktopIdle.getIdleTime();
  // if (n >= 5) {
  //   update(null, n * 1000)
  //   handle = setTimeout(next, (n + 1) * 1000)
  // } else {
    activeWin().then(w => {
      update(w.owner.name);

      if (!reset) console.log(moment().format('HH:mm:ss').yellow, 
        aLast.cyan, tLast.toString().grey,
        (aMost !== aLast && aMost !== '' ? aMost.magenta : ''), 
        (aMost !== aLast && aMost !== '' ? tMost.toString().gray : ''))

      if (reset) {
        aLast = ''
        aMost = ''
        tLast = 0
        tMost = 2000
      }

      handle = setTimeout(next, tMost - 500)
    })
  // }
}

const update = (a) => {
  const m = moment()
  const t = m.diff(tUpdate)
  tUpdate = m

  if (a === aLast) {
    tLast += t;
    if (tLast > tMost){
      if (aLast !== aMost) {
        tMost = tLast
        aMost = aLast
      } else {
        tMost += tLast
      }
    }
  } else {
    if (tLast > tMost) {
      if (aLast !== aMost) {
        tMost = tLast
        aMost = aLast
      } else {
        tMost += tLast
      }
    }

    aLast = a
    tLast = 1000
  }
}

let handle
next(true)

setInterval(() => {
  next(true)
  console.log(moment().format('HH:mm:ss').black.bgYellow, 
    aMost.black.bgWhite, tMost.toString().gray.bgWhite,
    (aMost !== aLast ? aLast.blue : ''), 
    (aMost !== aLast ? tLast.toString().gray : ''))
}, 60000)
