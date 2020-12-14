layui.define(["urls", "layer", "form", "element"],function(e) {
		var http = layui.urls.http,
			url = layui.urls.url;

		var $ = layui.$,
			lay = layui.layer,
			form = layui.form,
			element = layui.element;

		(function() {
			http({
				url: url.menu,
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
							str += '<li class="layui-nav-item layui-nav-itemed">' +
								'<a>' + dataItem.title + '</a>' +
								'<dl class="layui-nav-child">' + sub + '</dl>' +
								'</li>';
						} else {
							str += '<li class="layui-nav-item">' +
								'<a>' + dataItem.title + '</a>' +
								'<dl class="layui-nav-child">' + sub + '</dl>' +
								'</li>';
						};
						
					};
					$("#side-menu").html(str);
					$("#side-menu").append('<li class="layui-nav-item"><a onclick="jump()">添加</a></li>')
					element.init();
				}
			})
		})();
		
		window.jump = function(id) {
			var dom = '<iframe class="iframe" src="../pages/sub1.html?id=' + id + '" frameborder="0"></iframe>'
			$("#iframe").html(dom);
		};
	
		
		
		window.back = function() {
			window.history.back();
		};
		$("#side-menu").on("click",".layui-nav-item",function(){
			$(this).siblings().removeClass("layui-nav-itemed");
		});
	e("climate", {})
});
