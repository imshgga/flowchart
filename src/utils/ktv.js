// import Katavorio from 'katavorio/src/katavorio.js'
import {DefaultKatavorioHelper} from 'katavorio/src/default-katavorio-helper.js'
import plumb from 'jsplumb'

// const ktv = new plumb.Katavorio()
const seh = new DefaultKatavorioHelper()
const ktv = new plumb.Katavorio({
  getPosition:seh.getPosition,
  setPosition:seh.setPosition,
  getSize:seh.getSize,
  addClass:seh.addClass,
  removeClass:seh.removeClass,
  bind:seh.addEvent,
  unbind:seh.removeEvent,
  fireEvent:function() {
      console.log(arguments);
  },
  intersects:seh.intersects,
  indexOf:seh.indexOf,
})

export default ktv
