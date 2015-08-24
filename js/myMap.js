var map = new BMap.Map("container", {
		enableMapClick : false
	}); //设置底图
var x = 118.200291; //设置中心点经度
var y = 24.498195; //设置中心点纬度
var point = new BMap.Point(x, y); // 创建点坐标
map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别。
map.enableScrollWheelZoom(); // 启用滚轮放大缩小。
map.enableKeyboard(); // 启用键盘操作。
map.setDefaultCursor("default"); //默认鼠标指针
map.setMapStyle({
	style : 'midnight'
});
// 右键菜单
var menu = new BMap.ContextMenu();
var txtMenuItem = [{
		text : '设置临时避难所',
		callback : function () {
		}
	}
];
for (var i = 0; i < txtMenuItem.length; i++) {
	menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
}
map.addContextMenu(menu);

getFile(0);
myTimeLine();
/*
//定时器自动播放
var time = 0;
function CountDown() {
if (time <= 90) {
//读取csv文件
d3.csv("data/node.csv", function (error, csvdata) {
map.clearOverlays();
setMapInfo(csvdata,time);
});
} else {
clearInterval(timer);
alert("时间到，结束!");
}
time=time+1;
}
var timer = setInterval("CountDown()", 10); */

// 按照时间读取文件并展示
function getFile(_time) {
	map.clearOverlays();
	//读取csv文件
	d3.csv("data/node.csv", function (error, csvdata) {
		setMapNodeInfo(csvdata, 10);
	});
	d3.csv("data/road.csv", function (error, csvdata) {
		setMapLineInfo(csvdata, 10);
	});
}

// 定义自定义覆盖物的构造函数
function SquareOverlay(center, length, color, type, id) {
	this._center = center;
	this._length = length;
	this._color = color;
	this._type = type;
	this._id = id;
}
// 继承API的BMap.Overlay
SquareOverlay.prototype = new BMap.Overlay();
// 实现初始化方法
SquareOverlay.prototype.initialize = function (map) {
	// 保存map对象实例
	this._map = map;
	// 创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.id = this._id;
	div.style.position = "absolute";
	// 可以根据参数设置元素外观
	div.style.width = this._length + "px";
	div.style.height = this._length + "px";
	//设置类型 type>0圆形，type<0菱形
	if (this._type > 0) {
		div.style.borderRadius = "100px";
	} else if (this._type < 0) {
		div.style.transform = "rotate(40deg)";
	}
	div.style.background = this._color;
	// 将div添加到覆盖物容器中
	map.getPanes().markerPane.appendChild(div);
	// 保存div实例
	this._div = div;
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。
	return div;
}
// 实现绘制方法
SquareOverlay.prototype.draw = function () {
	// 根据地理坐标转换为像素坐标，并设置给容器
	var position = this._map.pointToOverlayPixel(this._center);
	this._div.style.left = position.x - this._length / 2 + "px";
	this._div.style.top = position.y - this._length / 2 + "px";
}

// 自定义覆盖物添加事件方法
SquareOverlay.prototype.addEventListener = function (event, fun) {
	this._div['on' + event] = fun;
}

/* // 定义自定义绘线的构造函数
function LineOverlay(startNode, endNode, color, length, id) {
this._startNode = startNode;
this._endNode = endNode;
this._color = color;
this._length = length;
this._id = id;
}
// 继承API的BMap.Overlay
LineOverlay.prototype = new BMap.Overlay();
// 实现初始化方法
LineOverlay.prototype.initialize = function (map) {
this._map = map;
var canvas = document.createElement("canvas");
canvas.style.position = "absolute";
//canvas.style.visibility = "visible";
map.getPanes().markerPane.appendChild(canvas);
this._canvas = canvas;
return canvas;
}
// 实现绘制方法
LineOverlay.prototype.draw = function () {
// 根据地理坐标转换为像素坐标，并设置给容器
var positionStart = this._map.pointToOverlayPixel(this._startNode);
var positionEnd = this._map.pointToOverlayPixel(this._endNode);
var cvs = this._canvas.getContext("2d");
//cvs.width = 100000000;
//cvs.height = 1000000000;
cvs.strokeStyle = 'blue';
cvs.lineWidth = 20;
cvs.beginPath();
cvs.moveTo(positionStart.x, positionStart.y);
cvs.lineTo(0, 0);
cvs.closePath();
cvs.stroke();
}

// 自定义覆盖物添加事件方法
LineOverlay.prototype.addEventListener = function (event, fun) {
this._div['on' + event] = fun;
} */

// 自定义设置标签
// @_x当前鼠标指针x位置
// @_y当前鼠标指针y位置
// @_lableText显示文字描述内容
// @_width显示框宽度
// @_height显示框高度
function setLable(_x, _y, _lableText, _width, _height) {
	// 创建div元素，作为自定义标签的容器
	var div = document.createElement("div");
	// div容器ID，便于清除标签
	div.id = "divLable";
	div.style.position = "absolute";
	// 设定标签框大小颜色
	div.style.width = _width + "px";
	div.style.height = _height + "px";
	div.style.background = "black";
	div.style.color = "white";
	div.style.opacity = 0.8;
	// 设定标签位置：鼠标所在位置
	div.style.left = _x + "px";
	div.style.top = _y + "px";

	//div.style.left = parseInt(_this.style.left) + parseInt(_this.style.width) * 1.2 + "px";
	//div.style.top = parseInt(_this.style.top) - parseInt(_this.style.height) / 2 + "px";
	div.innerHTML = _lableText;
	map.getPanes().markerPane.appendChild(div);

}

// 自定义清除所有标签
function removeLable() {
	map.getPanes().markerPane.removeChild(document.getElementById("divLable"));
}

// 自定义扩展属性：用于显示标签
BMap.Polyline.prototype.setTitle = function (title) {
	this.title = title
}

// 实现返回图形大小
// 计算方式待完善
function getSize(_num) {
	var _size = 0;
	if (_num > 10000) {
		_size = 40 + _num / 10000;
	} else if (_num > 1000) {
		_size = 30 + _num / 1000;
	} else if (_num > 100) {
		_size = 20 + _num / 100;
	} else {
		_size = 10 + _num / 100;
	}
	return _size;
}

// 实现地图点标注
function setMapNodeInfo(mapInfo, time) {

	//定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
	var linear = d3.scale.linear()
		//.domain([minvalue, maxvalue])
		.domain([0, 100])
		.range([0, 1]);

	// 定义最小值和最大值对应的颜色
	var a = d3.rgb(0, 255, 0); //红色
	var b = d3.rgb(255, 0, 0); //绿色

	// 循环所有点赋值并添加到图层
	for (var _i = 0; _i < mapInfo.length; _i++) {
		if (mapInfo[_i].time == time) {
			var _occupancy = parseInt(mapInfo[_i].num) / parseInt(mapInfo[_i].max) * 100; //占有率临时变量，人数/最大容纳力*100
			var computeColor = d3.interpolate(a, b);
			var _type = mapInfo[_i].type;
			// 使用div中title属性传递内容：占有率|编号|当前人数
			var _id = _occupancy.toFixed(2) + "|" + mapInfo[_i].id + "|" + parseInt(mapInfo[_i].num) + "|" + mapInfo[_i].x + "|" + mapInfo[_i].y;
			var t = linear(_occupancy);
			var color = computeColor(t);
			var point = new BMap.Point(mapInfo[_i].x, mapInfo[_i].y);
			var mySquare = new SquareOverlay(point, getSize(parseInt(mapInfo[_i].num)), color, mapInfo[_i].type, _id);
			map.addOverlay(mySquare);

			// 为自定义覆盖物添加自定义事件

			// 鼠标移动上后显示图例
			// 占有率保留小数点后两位
			mySquare.addEventListener('mouseover', function () {
				// 使用div中title属性传递内容：占有率|类型|当前人数
				var _idText = new Array(); //定义一数组
				_idText = this.id.split("|"); //字符分割
				var lableText = "节点编号:" + _idText[1] + "<br/>占有率:" + _idText[0] + "%<br/>当前人数:" + _idText[2]; //文字提示框内容
				var position = map.pointToOverlayPixel(new BMap.Point(_idText[3], _idText[4]));
				setLable(position.x, position.y, lableText, 100, 60);
			});

			// 鼠标点击后显示分析图
			// 占有率保留小数点后两位
			mySquare.addEventListener('click', function (e) {
				_idText = e.originalTarget.id.split("|"); //字符分割
				myDetaile(_idText[1]);
			});

			//鼠标移出后清除标签
			mySquare.addEventListener('mouseout', function () {
				removeLable();
			});
		}
	}
}

// 实现地图线标注
function setMapLineInfo(mapInfo, time) {
	//定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
	var linear = d3.scale.linear()
		.domain([0, 100])
		.range([0, 1]);

	// 定义最小值和最大值对应的颜色
	var a = d3.rgb(0, 255, 0); //红色
	var b = d3.rgb(255, 0, 0); //绿色

	// 循环所有线赋值并添加到图层
	for (var _i = 0; _i < mapInfo.length; _i++) {
		if (mapInfo[_i].time == time) {
			var _occupancy = parseInt(mapInfo[_i].num) / parseInt(mapInfo[_i].max) * 100; //占有率临时变量，人数/最大容纳力*100
			var computeColor = d3.interpolate(a, b);
			var t = linear(_occupancy);
			var color = computeColor(t);
			var polyline = new BMap.Polyline([
						new BMap.Point(mapInfo[_i].sx, mapInfo[_i].sy),
						new BMap.Point(mapInfo[_i].ex, mapInfo[_i].ey)
					], {
					strokeColor : color,
					strokeWeight : 10,
					strokeOpacity : 0.5
				}); //创建折线
			//console.log(mapInfo[_i]);
			polyline.setTitle("路线编号" + mapInfo[_i].id + "<br/>道路方向:" + mapInfo[_i].sid + "->" + mapInfo[_i].eid + "<br>道路人数：" + mapInfo[_i].num + "<br/>道路占用率:" + _occupancy.toFixed(2) + "%");
			map.addOverlay(polyline); //增加折线

			// 鼠标移动上后显示图例
			polyline.addEventListener('mouseover', function (e) {
				var position = this.map.pointToOverlayPixel(e.point);
				setLable(position.x, position.y, this.title, 130, 80);
			});

			//鼠标移出后清除标签
			polyline.addEventListener('mouseout', function () {
				removeLable();
			});
		}
	}
}
