export default function createEid (chartId) {
  let stamp = (+new Date()).toString().slice(-6)
  let ext = Math.random().toString().slice(-6)

  let eid = `${chartId}-${stamp}-${ext}`
  return eid
}
