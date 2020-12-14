layui.extend({
	urls: "api/urls",
}).define(["urls", "jquery", "layer"], function(exports) {
	var $ = layui.$,
		lay = layui.layer,
		urls = layui.urls;

	function http(val) {
		if (val.type == 'post') {
			val.contentType = 'application/x-www-form-urlencoded';
		};
		var url = val.url || '';
		var type = val.type || 'get';
		var data = val.data || {};
		var dataType = val.dataType || 'json';
		var async = val.async || true;
		var token = sessionStorage.token || '';
		// data.token = token;
		$.ajax({
			url: url,
			type: type,
			headers: {
				'Content-Type': val.contentType
			},
			data: data,
			dataType: dataType,
			async: async,
			beforeSend: function(bef) {
				val.beforeSend && val.beforeSend();
			},
			success: function(res) {
				val.success && val.success(res);
			},
			error: function(err) {
				console.log(err.status)
				// val.error && val.error(code);
			},
			complete: function(r) {
				val.complete && val.complete(r);
			}
		});
	};
	var load = {
		isClick: true,
		down: function(url) {
			if (load.isClick) {
				load.isClick = false;
				setTimeout(function() {
					load.isClick = true;
				}, 2000);
				window.top.open(url);
			};
		}
	};
	var loads = {
		click: true,
		down: function(url) {
			if (loads.click) {
				loads.click = false;
				setTimeout(function() {
					loads.click = true;
				}, 2000);
				window.top.location.href = url;
			};
		}
	};
	// exports('http', http);
	exports('http', {
		http: http,
		load: load,
		loads: loads
	});
});
