const slots = [
  {
    id: 'yes',
    desc: '是',
    layout: 'Left',
    color: '#80cb54',
  },
  {
    id: 'no',
    desc: '否',
    layout: 'Right',
    color: '#b81f3a',
  },
  {
    id: 'error',
    desc: '异常',
    layout: 'BottomCenter',
    color: '#A8A8A8',
  },
]

export const getChartTypes = [
  {
    nodeType: 0,
    desc: '开始',
  },
  {
    nodeType: 1,
    desc: '是否首次',
    slots,
  },
  {
    nodeType: 2,
    desc: '是否白条',
    slots,
  },
  {
    nodeType: 3,
    desc: '是否小金库',
    slots,
  },
  {
    nodeType: 4,
    desc: '成功消息',
  },
  {
    nodeType: 5,
    desc: '失败消息',
  },
  {
    nodeType: 6,
    desc: '异常消息',
  },
]

export const getChartList = [{
	"nodeType": 0,
  "nodeName": "mock",
	"desc": "开始",
	"link": "3-441297-040835",
	"x": 429,
	"y": 77,
	"eid": "0-441297-521954"
}, {
	"nodeType": 1,
  "nodeName": "mock",
	"desc": "是否首次",
	"x": 190,
	"y": 261,
	"slots": [{
		"id": "yes",
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "4-458118-352866"
	}, {
		"id": "no",
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "5-464813-797065"
	}, {
		"id": "error",
		"desc": "异常",
		"link": "6-468581-289691",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "1-441297-835852"
}, {
	"nodeType": 2,
  "nodeName": "mock",
	"desc": "是否白条",
	"x": 675,
	"y": 252,
	"slots": [{
		"id": "yes",
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "6-441297-910063"
	}, {
		"id": "no",
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "4-441297-566729"
	}, {
		"id": "error",
		"desc": "异常",
		"link": "5-441297-788787",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "2-441297-241372"
}, {
	"nodeType": 3,
  "nodeName": "mock",
	"desc": "是否小金库",
	"x": 429,
	"y": 188,
	"slots": [{
		"id": "yes",
		"desc": "是",
		"layout": "Left",
		"color": "#80cb54",
		"link": "1-441297-835852"
	}, {
		"id": "no",
		"desc": "否",
		"layout": "Right",
		"color": "#b81f3a",
		"link": "2-441297-241372"
	}, {
		"id": "error",
		"desc": "异常",
		"link": "6-470533-998627",
		"layout": "BottomCenter",
		"color": "#A8A8A8"
	}],
	"eid": "3-441297-040835"
}, {
	"nodeType": 6,
  "nodeName": "mock",
	"desc": "成功消息",
	"x": 568,
	"y": 361,
	"eid": "6-441297-910063"
}, {
	"nodeType": 4,
  "nodeName": "mock",
	"desc": "失败消息",
	"x": 784,
	"y": 538,
	"eid": "4-441297-566729"
}, {
	"nodeType": 5,
  "nodeName": "mock",
	"desc": "异常消息",
	"x": 675,
	"y": 451,
	"eid": "5-441297-788787"
}, {
	"nodeType": 4,
  "nodeName": "mock",
	"desc": "成功消息",
	"eid": "4-458118-352866",
	"x": 80,
	"y": 533
}, {
	"nodeType": 5,
  "nodeName": "mock",
	"desc": "失败消息",
	"eid": "5-464813-797065",
	"x": 298,
	"y": 362
}, {
	"nodeType": 6,
  "nodeName": "mock",
	"desc": "异常消息",
	"eid": "6-468581-289691",
	"x": 190,
	"y": 443
}, {
	"nodeType": 6,
  "nodeName": "mock",
	"desc": "异常消息",
	"eid": "6-470533-998627",
	"x": 429,
	"y": 532
}]
