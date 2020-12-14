layui.define(["jquery", "carousel"], function(e) {
	var $ = layui.jquery;
	// 获取日期和星期
	function setDetaFn() {
		var week = ['日', '一', '二', '三', '四', '五', '六'];
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
		var d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
		var w = date.getDay();
		$("#week").html("星期" + week[w]);
		$("#date").html(y + '.' + m + '.' + d);
	};
	setDetaFn();
	// 获取时间
	function setTimeFn() {
		var date = new Date();
		var h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
		var m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
		var s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
		var str = h + ':' + m + ':' + s;
		if (str == '00:00:00') {
			setDetaFn();
		};
		$("#time").html(str);
		setTimeout(setTimeFn, 500);
	};
	setTimeFn();
	// 退出系统
	$("#out").click(function() {
		window.location.href = "../index.html";
	});

	e("lib", {})
});
