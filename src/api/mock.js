const slots = [
  {
    id: 1,
    slotType: 'yes',
    desc: '是',
    layout: 'Left',
    color: '#80cb54',
  },
  {
    id: 2,
    slotType: 'no',
    desc: '否',
    layout: 'Right',
    color: '#b81f3a',
  },
  {
    id: 3,
    slotType: 'error',
    desc: '异常',
    layout: 'BottomCenter',
    color: '#A8A8A8',
  },
]

const payload = {
  'param1': {
    name: '参数1',
    value: ''
  },
  'param2':{
    name: '参数2',
    value: ''
  },
}

export const getChartTypes = [
  {
    nodeType: 0,
    desc: '开始',
    payload,
  },
  {
    nodeType: 1,
    desc: '是否首次',
    slots,
    payload,
  },
  {
    nodeType: 2,
    desc: '是否白条',
    slots,
    payload,
  },
  {
    nodeType: 3,
    desc: '是否小金库',
    slots,
    payload,
  },
  {
    nodeType: 4,
    desc: '成功消息',
    payload,
  },
  {
    nodeType: 5,
    desc: '失败消息',
    payload,
  },
  {
    nodeType: 6,
    desc: '异常消息',
    payload,
  },
]

export const getChartList = [{
	"nodeType": 0,
  payload,
  "nodeName": "mock",
	"desc": "开始",
	"link": "3-441297-040835",
	"x": 429,
	"y": 77,
	"eid": "0-441297-521954",
}, {
	"nodeType": 1,
  payload,
  "nodeName": "mock",
	"desc": "是否首次",
	"x": 190,
	"y": 261,
	"slots": [{
    id: 1,
    slotType: 'yes',
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "4-458118-352866"
	}, {
    id: 2,
    slotType: 'no',
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "5-464813-797065"
	}, {
    id: 3,
    slotType: 'error',
		"desc": "异常",
		"link": "6-468581-289691",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "1-441297-835852"
}, {
	"nodeType": 2,
  payload,
  "nodeName": "mock",
	"desc": "是否白条",
	"x": 675,
	"y": 252,
	"slots": [{
    id: 1,
    slotType: 'yes',
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "6-441297-910063"
	}, {
    id: 2,
    slotType: 'no',
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "4-441297-566729"
	}, {
    id: 3,
    slotType: 'error',
		"desc": "异常",
		"link": "5-441297-788787",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "2-441297-241372"
}, {
	"nodeType": 3,
  payload,
  "nodeName": "mock",
	"desc": "是否小金库",
	"x": 429,
	"y": 188,
	"slots": [{
    id: 1,
    slotType: 'yes',
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "1-441297-835852"
	}, {
    id: 2,
    slotType: 'no',
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "2-441297-241372"
	}, {
    id: 3,
    slotType: 'error',
		"desc": "异常",
		"link": "6-470533-998627",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "3-441297-040835"
}, {
	"nodeType": 6,
  payload,
  "nodeName": "mock",
	"desc": "成功消息",
	"x": 568,
	"y": 361,
	"eid": "6-441297-910063"
}, {
	"nodeType": 4,
  payload,
  "nodeName": "mock",
	"desc": "失败消息",
	"x": 784,
	"y": 538,
	"eid": "4-441297-566729"
}, {
	"nodeType": 5,
  payload,
  "nodeName": "mock",
	"desc": "异常消息",
	"x": 675,
	"y": 451,
	"eid": "5-441297-788787"
}, {
	"nodeType": 4,
  payload,
  "nodeName": "mock",
	"desc": "成功消息",
	"eid": "4-458118-352866",
	"x": 80,
	"y": 533
}, {
	"nodeType": 5,
  payload,
  "nodeName": "mock",
	"desc": "失败消息",
	"eid": "5-464813-797065",
	"x": 298,
	"y": 362
}, {
	"nodeType": 6,
  payload,
  "nodeName": "mock",
	"desc": "异常消息",
	"eid": "6-468581-289691",
	"x": 190,
	"y": 443
}, {
	"nodeType": 6,
  payload,
  "nodeName": "mock",
	"desc": "异常消息",
	"eid": "6-470533-998627",
	"x": 429,
	"y": 532
}]
