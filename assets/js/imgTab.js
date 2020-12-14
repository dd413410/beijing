layui.define(["http", "form", "laydate"], function(e) {
	var http = layui.http.http,
		urls = layui.urls;


	var $ = layui.$,
		lay = layui.layer,
		form = layui.form,
		laydate = layui.laydate;

	
	var element = null;
	window.comListFn = function(data) {
		element = data.id;
		http({
			url: urls.getSave,
			type: "get",
			data: data,
			success: function(res) {
				var dataImg = res.img;
				console.log(res)
				$("#forecast").attr("src", dataImg.forecast);
				$("#monitor").attr("src", dataImg.monitor);
				$(".hide").show();

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
				
				laydate.render({
					elem: '#dete',
					type: 'month',
					trigger: 'click'
				});
			}
		});
	};
	// 保存
	form.on('submit(addBtn)', function(data) {
		var data = data.field;
		console.log(data)
		data.element = element;
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
	e("imgTab", {})
});
