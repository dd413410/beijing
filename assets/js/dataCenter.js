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
					var dataItem = data[i].data;
					var thead = '<tr><td colspan="2"><span class="thead">' + data[i].title + '</span></td></tr>';
					var tbody = '';
					for (var d = 0; d < dataItem.length; d++) {
						var item = dataItem[d];
						tbody += '<tr>' +
							'<td><a  href="./dataDeta.html?id=' + item.id + '">' + item.LinkName + '</a></td>' +
							'<td>' + item.description + '</td>' +
							'</tr>';
					};
					str += thead + tbody;
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
