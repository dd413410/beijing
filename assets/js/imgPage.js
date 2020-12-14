layui.define(["http"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		lay = layui.layer;
		
	window.comListFn = function (data) {
		http({
			url: urls.getImg,
			type: "get",
			data: data,
			success: function(res) {
				var data = res.data;
				if (data.length <= 0) {
					lay.msg("查询无结果");
					return false;
				};
				$("#img").attr("src", data.url);
			}
		});
	};
	e("imgPage", {})
});
