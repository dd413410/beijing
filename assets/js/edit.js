layui.define(["http", "hand", "form"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		loads = layui.http.loads,
		hand = layui.hand;
	var $ = layui.$,
		layer = layui.layer,
		form = layui.form;


	// 初始化在线编辑
	var myedit = "myedit";

	function initEditFn() {
		tinymce.init({
			selector: '#' + myedit,
			auto_focus: true,
			// width: 1149,
			width: 1150,
			language: 'zh_CN',
			skin: 'oxide-dark',
			resize: false,
			statusbar: false,
			// plugins: 'toc image hr insertdatetime print',
			plugins: 'toc image hr insertdatetime  pagebreak print',
			toolbar: 'toc undo redo restoredraft | cut copy paste | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify outdent indent |  formatselect fontselect fontsizeselect |insertdatetime',
			fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
			font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
			menu: {
				file: {
					title: '文件',
					items: 'toc   print'
				},
				edit: {
					title: '编辑',
					items: 'undo redo | cut copy paste pastetext'
				},
				view: {
					title: '查看',
					items: 'visualaid'
				},
				insert: {
					title: '插入',
					items: 'image hr insertdatetime pagebreak'
				},
				format: {
					title: '格式',
					items: 'bold italic underline strikethrough | formats | removeformat'
				},
			},
			images_upload_handler: function(blobInfo, succFun, failFun) {
				var file = blobInfo.blob();
				formData = new FormData();
				formData.append('img', file, file.name);
				$.ajax({
					url: urls.uploadImg,
					type: 'post',
					processData: false,
					contentType: false,
					data: formData,
					success: function(res, text, xhr) {
						succFun(res.data);
					}
				})
			}
		});
	};
	initEditFn();

	var id = hand.locaStr("id");


	// 获取示例图片
	function getProdImg() {
		http({
			url: urls.getProdImg,
			type: "get",
			data: {
				id: id
			},
			success: function(res) {
				var data = res.data;
				for (var i = 0; i < data.length; i++) {
					// var domId = "imgId" + i;
					// var str = '<div class="imgBox" id="' + domId + '">' +
					// 	'<img src="' + data[i].url + '" alt="' + data[i].title + '" pid="' + domId + '">' +
					// 	'<p class="img-tips">' +
					// 	'<span class="lt">' + data[i].title + '</span>' +
					// 	'</p>' +
					// 	'</div>';
					var domId = "imgId" + i;
					var str = '<div class="imgBox" id="' + domId + '">' +
						'<img src="' + data[i].url + '" alt="' + data[i].title + '" pid="' + domId + '">' +
						'</div>';
					$("#img-conter").append(str);
				}
			}
		})
	};
	getProdImg();
	// 点击图片查看大图
	$("#img-conter").on("click", "img", function() {
		var pid = $(this).attr("pid");
		layer.photos({
			photos: "#" + pid,
			anim: 5
		})
	});
	// 获取历史案例
	function getCase() {
		$("#case-conter").empty();
		http({
			url: urls.getCase,
			type: "get",
			data: {
				id: id
			},
			success: function(res) {
				var data = res.data;
				var str = '';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					str += '<option value="' + dataItem.id + '">' + dataItem.time + '案例</option>';
				};
				$("#case").append(str);
				form.render("select");
			}
		})
	};
	getCase();

	form.on('submit(caseBtn)', function(data) {
		var data = data.field;
		http({
			url: urls.getDeta,
			type: "get",
			data: data,
			success: function(res) {
				var data = res.data;
				layer.open({
					type: 1,
					id: "1",
					title: "文档模板预览",
					area: ['1150px', '780px'],
					content: data
				});
			}
		});
	});
	// 保存
	window.getContent = function() {
		var cnt = tinyMCE.editors[myedit].getContent();
		if (cnt.length <= 0) {
			layer.msg("请输入内容!");
			return false;
		};

		var layIdx = layer.confirm('确定保存此案例?', {
			btn: ['确定', '取消']
		}, function() {
			http({
				url: urls.sumbit,
				type: "post",
				data: {
					id: id,
					content: cnt
				},
				success: function(res) {
					layer.msg("保存成功");
					layer.close(layIdx);
					getCase();
				}
			})
		});
	};
	// 预览
	window.preview = function() {
		var cnt = tinyMCE.editors[myedit].getContent();
		if (cnt.length <= 0) {
			layer.msg("请输入内容!");
			return false;
		};
		layer.open({
			type: 1,
			id: "1",
			title: "文档模板预览",
			area: ['1150px', '780px'],
			content: cnt
		});
	};
	// 导出
	window.exportFn = function() {
		console.log(title)
		var head = title + timeFn();
		var cnt = tinyMCE.editors[myedit].getContent();
		if (cnt.length <= 0) {
			layer.msg("请输入内容!");
			return false;
		};

		var layIdx = layer.confirm('确定导出为word文档?', {
			title: false,
			closeBtn: 0,
			btn: ['确定', '取消']
		}, function() {
			http({
				url: urls.product,
				type: "post",
				data: {
					title: head,
					data: cnt
				},
				success: function(res) {
					var url = res.url;
					window.location.href = url;
					layer.close(layIdx);
				}
			});
		});
	};

	// 获取默认
	var title = '';

	function getDefaFn() {
		http({
			url: urls.product,
			type: "get",
			data: {
				id: id
			},
			success: function(res) {
				var data = res.data;
				if (data.length <= 0) {
					return false;
				};
				title = res.title;
				$("#title").html(title);
				var date = timeFn();
				$("#title").append('<span>' + date + '</span>');
				tinyMCE.editors[myedit].setContent(data);
			}
		});
	};
	getDefaFn();

	function timeFn() {
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		return y + "年" + m + "月";
	};

	e("edit", {})
});
