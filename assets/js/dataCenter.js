layui.define(["http"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		loads = layui.http.loads;

	var $ = layui.$,
		lay = layui.laye;


	function getDataFn() {
		http({
			url: urls.dataCenter,
			type: "get",
			success: function(res) {
				var data = res.data;
				var str = '';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i].fields;
					str += '<tr><td><a href="#">' + dataItem.LinkName + '</a></td>' +
						'<td>' + dataItem.description + '</td>' +
						'</tr>';
				};
				$("#tbody").html(str);
			}
		});
	};
	getDataFn();


	// 获取月会商
	function getMeetFn() {
		http({
			url: urls.getCase,
			type: "get",
			data: {
				id: 53
			},
			success: function(res) {
				console.log(res)
				var data = res.data;
				var str = '';

				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					str += '<tr><td><span onclick="expFn(' + dataItem.id + ')">' + dataItem.time + '</span></td></tr>';
				};
				$("#meet").html(str);

			}
		});
	};
	getMeetFn();
	// 点击导出
	window.expFn = function(id) {
		http({
			url: urls.getPro,
			type: "get",
			data: {
				id: id
			},
			success: function(res) {
				var url = res.path;
				loads.down(url);
			}
		})
	};
	
	e("dataCenter", {})
});
