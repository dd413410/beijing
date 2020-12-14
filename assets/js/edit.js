layui.define(["http", "hand"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		loads = layui.http.loads,
		hand = layui.hand;
	var $ = layui.$,
		lay = layui.layer;
	// 初始化在线编辑
	var myedit = "myedit";

	function initEditFn() {
		tinymce.init({
			selector: '#' + myedit,
			auto_focus: true,
			width: 1149,
			language: 'zh_CN',
			skin: 'oxide-dark',
			resize: false,
			statusbar: false,
			// plugins: 'toc image hr insertdatetime print',
			plugins: 'toc image hr insertdatetime preview pagebreak print',
			toolbar: 'toc undo redo restoredraft | cut copy paste | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify outdent indent |  formatselect fontselect fontsizeselect |insertdatetime',
			fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
			font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
			menu: {
				file: {
					title: '文件',
					items: 'toc  preview print'
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
					var domId = "imgId" + i;
					var str = '<div class="imgBox" id="' + domId + '">' +
						'<img src="' + data[i].url + '" alt="' + data[i].title + '" pid="' + domId + '">' +
						'<p class="img-tips">' +
						'<span class="lt">' + data[i].title + '</span>' +
						'</p>' +
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
		lay.photos({
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
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var item = JSON.stringify(dataItem).replace(/\"/g, "'");
					var str = '<div class="case-item">' +
						'<div class="lt">' + dataItem.time + '案例</div>' +
						'<div class="rt">' +
						'<button class="layui-btn layui-btn-xs layui-btn-normal" onclick="impFn(' + item + ')">导入</button>' +
						'<button class="layui-btn layui-btn-xs layui-btn-normal" onclick="expFn(' + item + ')">导出</button>' +
						// '<button class="layui-btn layui-btn-xs layui-btn-normal" onclick="alrFn(' + item + ')">预览</button>' +
						// '<button class="layui-btn layui-btn-xs layui-btn-normal" onclick="impFn(' + item + ')">导入</button>' +
						'</div>' +
						'</div>';
					$("#case-conter").append(str);
				};
				
				if (data.length > 0) {
					http({
						url: urls.getDeta,
						type: "get",
						data: {
							id: data[0].id
						},
						success: function(res) {
							var data = res.data;
							tinyMCE.editors[myedit].setContent(data);
						}
					});
				}
			}
		})
	};
	getCase();

	// 导入历史word文档
	window.impFn = function(data) {
		var id = data.id;
		var index = lay.confirm('此操作会覆盖您目前所编辑的内容,是否继续?', {
			btn: ['导入', '放弃']
		}, function() {
			http({
				url: urls.getDeta,
				type: "get",
				data: {
					id: id
				},
				success: function(res) {
					var data = res.data;
					tinyMCE.editors[myedit].setContent(data);
					lay.close(index);
				}
			});
		}, function() {
			lay.close(index);
		});
	};
	// 导出
	window.expFn = function(data) {
		http({
			url: urls.getPro,
			type: "get",
			data: {
				id: data.id
			},
			success: function(res) {
				var url = res.path;
				loads.down(url);
			}
		})
	};
	// 保存
	window.getContent = function() {
		var cnt = tinyMCE.editors[myedit].getContent();
		if (cnt.length <= 0) {
			lay.msg("请输入内容!");
			return false;
		};
		http({
			url: urls.sumbit,
			type: "post",
			data: {
				id: id,
				content: cnt
			},
			success: function(res) {
				lay.msg("保存成功");
				getCase();
			}
		})
	};

	// 预览
	window.preview = function() {
		var data = tinyMCE.editors[myedit].getContent();
		if (data.length <= 0) {
			lay.msg("请输入内容!");
			return false;
		};
		layer.open({
			type: 1,
			title: "文档模板预览",
			area: ['1149px', '780px'],
			content: data
		});
	};



	// 临时测试
	function initImpFn() {
		http({
			url: urls.product,
			type: "get",
			success: function(res) {
				console.log(res)

				// var data = res.old;
				// tinyMCE.editors[myedit].setContent(data);
			}
		});
	};
	initImpFn();


	e("edit", {})
});
