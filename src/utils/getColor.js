let colorList = [
  '#7167ea',
  '#23a2f5',
  '#EE3758',
  '#FDBA50',
  '#80CB54',
  '#1F97A6',
  '#B364D8',
  '#FF7CDC',
  '#FDDD00',
  '#56D9F3',
  '#EC6901',
  '#47885E',
  '#275FDF',
  '#88A8BD',

  '#433BAC',
  '#007CCD',
  '#B81F3A',
  '#D59837',
  '#5D9F36',
  '#0F6772',
  '#8539A8',
  '#C74AA5',
  '#C8AF00',
  '#339EB2',
  '#B24E00',
  '#2B5F3D',
  '#1442AC',
  '#5E8096',
]

let i = 0
export default function getColor () {
  let color = colorList[i % 28]
  i++;
  return color
}
