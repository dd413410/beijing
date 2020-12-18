layui.define(["http", "hand", "form", "table"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		loads = layui.http.loads,
		hand = layui.hand;

	var $ = layui.$,
		lay = layui.laye,
		form = layui.form,
		table = layui.table;

	var id = hand.locaStr("id");
	var time = timeFn() + "01";

	function getDataFn() {
		http({
			url: urls.deta,
			type: "get",
			data: {
				id: id,
				time: time
			},
			success: function(res) {
				var title=res.title;
				$("#title").html(title);
				var simple = res.Simple;
				$("#simple").html(simple);
				var desc = res.description;
				$("#desc").html(desc);
				
				var url = res.url;
				form.val("layForm", {
					id: id,
					url: url
				});

				var data = res.data;
				data.length <= 0 ? data = [] : data = res.data;
				table.render({
					elem: '#table',
					data: data,
					cols: [
						[{
							field: 'title',
							title: '文件名'
						}, {
							field: 'path',
							title: '文件路径'
						}, {
							field: 'server',
							title: '实际文件大小'
						}, {
							field: 'local',
							title: '下载数据大小'
						}]
					]
				});

			}
		});
	};
	getDataFn();

	$("td").click(function() {
		$("td").removeClass("add");
		$(this).addClass("add");
		var id = $(this).attr("lay-id");
		time = timeFn() + id;
		getDataFn();
	});


	//监听提交
	form.on('submit(dataBtn)', function(data) {
		var data = data.field;
		http({
			url: urls.deta,
			type: "post",
			data: data,
			success: function(res) {
				console.log(res)
				layer.msg("修改成功");
			}
		});
	});












	form.verify({
		dete: function(val) {
			if (!hand.regUrl(val)) {
				return '请输入正确的网址!';
			}
		},
	});

	function timeFn() {
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth();
		return y + "-";
	};

	window.navToFn = function() {
		window.location.href = "./datas.html?id=" + id;
	};


	e("dataDeta", {})
});
