layui.define(["http", "carousel"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		carousel = layui.carousel;

	var user = sessionStorage.user;
	$("#user").html(user + " 欢迎登陆");

	// 跳转不同的页面
	$(".menu-item").click(function() {
		var url = $(this).attr("url");
		window.location.href = url;
	});
	// 获取图片
	function getDataFn() {
		http({
			url: urls.new_oisst,
			type: "get",
			success: function(res) {
				var data = res.data;
				var list = res.data;
				var str = '';
				for (var l = 0; l < list.length; l++) {
					str += '<img src="' + list[l] + '" />'
				};
				$("#centerCar").html('<div carousel-item>' + str + '</div>');
				carousel.render({
					elem: '#centerCar',
					interval: 1800,
					width: "100%",
					height: "100%",
					anim: "fade",
					interval: 3000,
					arrow: "none",
					indicator: "none"
				});
			}
		})
	};
	getDataFn();
	
	e("home", {})
});
