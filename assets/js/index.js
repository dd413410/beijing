layui.define(["http", "layer", "form"], function(e) {
	var http = layui.http,
		urls = layui.urls;

	var $ = layui.$,
		layer = layui.layer,
		form = layui.form;

	$("#loImg").click(function() {
		var is = $(this).attr('is');
		if (is == 1) {
			$(this).attr('is', '2');
			$(this).attr('src', './images/login4.png');
			$('#passWord').attr("type", "text");
		} else {
			$(this).attr('is', '1');
			$(this).attr('src', './images/login2.png');
			$('#passWord').attr("type", "password");
		};

	});

	form.on('submit(login)', function(data) {
		sessionStorage.user = "111";
		window.location.href = "./src/home.html";
		
		var data = data.field;
		http({
			url: urls.login,
			type: "post",
			data: data,
			success: function(res) {
				if(res.code==200){
					sessionStorage.clear();
					sessionStorage.user = data.username;
					 window.location.href = "./src/home.html";
				}else{
					lay.msg(res.msg)
				};
			},
			error: function(err) {
				lay.msg(err.msg)
			}
		});
	});
	$("body").keydown(function(e) {
		if (e.keyCode == 13) {
			$("#login").click();
		}
	});

	//自定义验证规则
	form.verify({
		username: function(value) {
			if (value.length <= 0) {
				return '请输入用户名!';
			}
		},
		password: function(value) {
			if (value.length <= 0) {
				return '请输入密码!';
			}
		}
	});
	e("index", {})
});
