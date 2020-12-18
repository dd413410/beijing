layui.define(["http"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		load = layui.http.load,
		loads = layui.http.loads;

	var $ = layui.$,
		lay = layui.layer;

	window.comListFn = function(data) {
		http({
			url: urls.getPdf,
			type: "get",
			data: data,
			success: function(res) {
				var data = res.data;
				if (data.length <= 0) {
					lay.msg("查询无结果");
					return false;
				};
				var str = '';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var item = JSON.stringify(dataItem).replace(/\"/g, "'");
					str += '<div class="list-item">' +
						'<p class="item-title" onclick="openFn(' + item + ')">' + dataItem.title + '</p>' +
						'<p class="item-time">' + dataItem.time + '</p>' +
						'<p class="item-btn" onclick="getZipFn(' + item + ')">下载ZIP包</p>' +
						'</div>';
				};
				$("#list").html(str);
			}
		});
	};
	// 打开
	window.openFn = function(data) {
		var url = data.url;
		load.down(url);
	};
	// 下载
	window.getZipFn = function(data) {
		var url = data.url;
		http({
			url: urls.getZip,
			type: "get",
			data: {
				link: url
			},
			success: function(res) {
				var data = res.data;
				if (data.length <= 0) {
					layer.msg("获取ZIP包失败");
					return false;
				};
				loads.down(data);
			}
		});
	};
	e("page1", {})
});
