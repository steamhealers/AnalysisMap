function myTimeLine() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'js/Echarts'
		}
	});

	// 使用
	require(
		[
			'echarts',
			'js/dark',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec, dark) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('timeLine'), dark);

		option = {
			title : {
				text : '海啸人员疏散整体分析',
				subtext : '海啸疏散所有时刻'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ['逃生成功率', '逃生人数']
			},
			calculable : true,
			xAxis : [{
					type : 'category',
					boundaryGap : false,
					data : (function () {
						var _time = new Array();
						for (var _i = 0; _i < 95; _i++) {
							_time.push(_i);
						}
						return _time;
					})()
				}
			],
			yAxis : [{
					type : 'value',
					axisLabel : {
						formatter : '{value} %'
					}
				}
			],
			series : [{
					name : '逃生成功率',
					type : 'line',
					data : (function () {
						var _time = new Array();
						for (var _i = 0, _n = 0; _i < 100; _i++) {
							_n = _n + Math.random() * 1.85147;
							_time.push(_n);
						}
						return _time;
					})()
				}, {
					name : '逃生人数',
					type : 'line',
					data : (function () {
						var _time = new Array();
						for (var _i = 0, _n = 0; _i < 100; _i++) {
							_n = _n + Math.random() * 1.85147;
							_time.push(_n);
						}
						return _time;
					})()
				}
			]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
		var ecConfig = require('echarts/config');
		function eConsole(param) {
			getFile(param.dataIndex);
			document.getElementById('timeScaler').innerHTML = param.dataIndex + ' T';
		}
		myChart.on(ecConfig.EVENT.CLICK, eConsole);
	});
}

function myDetaile(_id) {
	// 路径配置
	require.config({
		paths : {
			echarts : 'js/Echarts'
		}
	});

	// 使用
	require(
		[
			'echarts',
			'js/dark',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec, dark) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('timeLine'), dark);

		option = {
			title : {
				text : '编号 ' + _id + ' 数据分析',
				subtext : '海啸疏散所有时刻'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ['逃生成功率', '逃生人数']
			},
			calculable : true,
			xAxis : [{
					type : 'category',
					boundaryGap : false,
					data : (function () {
						var _time = new Array();
						for (var _i = 0; _i < 95; _i++) {
							_time.push(_i);
						}
						return _time;
					})()
				}
			],
			yAxis : [{
					type : 'value',
					axisLabel : {
						formatter : '{value} %'
					}
				}
			],
			series : [{
					name : '逃生成功率',
					type : 'line',
					data : (function () {
						var _time = new Array();
						for (var _i = 0, _n = 0; _i < 100; _i++) {
							_n = _n + Math.random() * 1.85147;
							_time.push(_n);
						}
						return _time;
					})()
				}, {
					name : '逃生人数',
					type : 'line',
					data : (function () {
						var _time = new Array();
						for (var _i = 0, _n = 0; _i < 100; _i++) {
							_n = _n + Math.random() * 1.85147;
							_time.push(_n);
						}
						return _time;
					})()
				}
			]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}
