layui.define(["http", "form", "element"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		lay = layui.layer,
		form = layui.form,
		element = layui.element;
		
	function getMenuFn() {
		http({
			url: urls.getmenu,
			type: "get",
			data: {
				type: 6
			},
			success: function(res) {
				var data = res.data;
				var str = '';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var sub = '';
					if (dataItem.data.length > 0) {
						for (var a = 0; a < dataItem.data.length; a++) {
							if (i == 0 && a == 0) {
								sub += '<dd class="layui-this"><a onclick="jump(' + dataItem.data[a].id + ')">' + dataItem.data[a].title +
									'</a></dd>';
								jump(dataItem.data[a].id);
							} else {
								sub += '<dd><a onclick="jump(' + dataItem.data[a].id + ')">' + dataItem.data[a].title + '</a></dd>';
							};
						};
					};
					if (i == 0) {
						if (sub == '') {
							str += '<li class="layui-nav-item layui-nav-itemed layui-this">' +
								'<a onclick="jump(' + dataItem.id + ')">' + dataItem.title + '</a>' +
								'</li>';
							jump(dataItem.id);
						} else {
							str += '<li class="layui-nav-item layui-nav-itemed">' +
								'<a>' + dataItem.title + '</a>' +
								'<dl class="layui-nav-child">' + sub + '</dl>' +
								'</li>';
						};
					} else {
						if (sub == '') {
							str += '<li class="layui-nav-item layui-nav-itemed">' +
								'<a onclick="jump(' + dataItem.id + ')">' + dataItem.title + '</a>' +
								'</li>';
						} else {
							str += '<li class="layui-nav-item layui-nav-itemed">' +
								'<a>' + dataItem.title + '</a>' +
								'<dl class="layui-nav-child">' + sub + '</dl>' +
								'</li>';
						};
					};
					$("#side-menu").html(str);
					element.init();
				}
			}
		})
	};
	getMenuFn();


	window.jump = function(id) {
		var src = "../pages/edit.html?id=" + id;
		var dom = '<iframe class="iframe" src="' + src + '" frameborder="0"></iframe>'
		$("#iframe").html(dom);
	};

	window.back = function() {
		window.history.back();
	};
	e("prod", {})
});
