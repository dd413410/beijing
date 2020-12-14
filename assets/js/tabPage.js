layui.define(["http", "table"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		lay = layui.layer,
		table = layui.table;


	window.comListFn = function(data) {
		http({
			url: urls.getInspect,
			type: "get",
			data: {
				id: data.id,
				month: data.y
			},
			success: function(res) {
				console.log(res)
				var cols = res.cols;
				var data = res.data;

				table.render({
					elem: '#table',
					cellMinWidth: 100,
					cols: [cols],
					data: data,
					page: {
						layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
						groups: 5
					},
					limits: [10],
					limit: 10,
					height: "full-100"
				});
			}
		});
	};
	e("tabPage", {})
});
