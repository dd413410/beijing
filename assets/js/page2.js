layui.define(["http", "form", "laydate"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;

	var $ = layui.$,
		lay = layui.layer,
		form = layui.form,
		laydate = layui.laydate;

	var value = timeFn();
	var id = null;
	window.comListFn = function(data) {
		id = data.id;
		http({
			url: urls.getSave,
			type: "get",
			data: {
				id: id,
				time: value
			},
			success: function(res) {
				var data = res.data;
				var thead = '<div>月份</div>',
					tbody =
					'<div><input type="text" id="dete" name="Month" lay-verify="dete" autocomplete="off" class="layui-input"></div>';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					thead += '<div>' + dataItem.title + '</div>';
					tbody += '<div><input type="text" name="' + dataItem.val + '" lay-verify="required" lay-reqtext="请输入' +
						dataItem.title + '数值" autocomplete="off" class="layui-input"></div>';
				};
				$("#thead").html(thead);
				$("#tbody").html(tbody);
				$(".hide").show();
				initFn();
			}
		});
	};
	// 初始化日期
	function initFn() {
		laydate.render({
			elem: '#dete',
			type: 'month',
			value: value,
			trigger: 'click',
			done: function(val) {
				getImgFn(val);
			}
		});
		getImgFn(value);
	};
	// 获取图片
	function getImgFn(time) {
		console.log(time)

		http({
			url: urls.getSave,
			type: "get",
			data: {
				id: id,
				time: time
			},
			success: function(res) {
				console.log(res)

				var img1 = res.forecast,
					img2 = res.monitor;

				if (img1.length <= 0 || img2.length <= 0) {
					return false;
				};

				$("#img1").attr("src", img1);
				$("#img2").attr("src", img2);

				form.val('layForm', {
					"img1": img1,
					"img2": img2
				});


			}
		});
	};
	// 保存
	form.on('submit(addBtn)', function(data) {
		var data = data.field;
		data.element = id;
		http({
			url: urls.getSave,
			type: "post",
			data: data,
			success: function(res) {
				layer.msg("保存成功");
			}
		});
	});
	form.verify({
		dete: function(val) {
			var reg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))$/;
			if (!reg.test(val)) {
				return '请输入正确的日期;例如:2020-10!';
			}
		},
	});

	function timeFn() {
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		return y + "-" + m;
	};
	e("page2", {})
});
