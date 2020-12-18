layui.define(["http", "carousel"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		carousel = layui.carousel;

	var user = sessionStorage.user;
	$("#user").html(user + " 欢迎登陆");

	var w = $("#carousel").width();
	var h = Math.ceil(w / 2.3);
	var hPx = h + "px";
	
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
					str += '<div><img src="' + list[l] + '" /></div>'
				};
				$("#centerCar").html('<div carousel-item>' + str + '</div>');
				carousel.render({
					elem: '#centerCar',
					// autoplay:false,
					interval: 1800,
					width: "100%",
					height: hPx,
					anim: "fade",
					interval: 3000,
					arrow: "none",
					indicator: "none"
				});
			}
		})
	};
	getDataFn();
	
	// 跳转不同的页面
	$(".menu-item").click(function() {
		var url = $(this).attr("url");
		window.location.href = url;
	});


	e("home", {})
});
