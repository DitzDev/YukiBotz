const { createHash } = require('crypto')
let handler = async function (m, { args }) {
  if (!args[0]) throw 'Serial Number kosong'
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw 'Serial Number salah'
   let __waktuh = (new Date - global.db.data.users[m.sender].unreglast)
   let _waktuh = (+ 1000 - __waktuh)
   let waktuh = clockString(_waktuh)
   if (new Date - global.db.data.users[m.sender].unreglast > + 1000) {
  user.money = 0
  user.level = 0
  user.exp = 0
  user.age = 0
  user.unreglast = new Date * 1
  user.registered = false
  m.reply(`Unreg berhasil!`)
  } else m.reply(`Kamu sudah *unregister*..\nMohon tunggu ${waktuh} untuk bisa *unregister* kembali..`)
}
handler.help = ['unreg']
handler.tags = ['main']

handler.command = /^unreg(ister)?$/i
handler.register = true

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}