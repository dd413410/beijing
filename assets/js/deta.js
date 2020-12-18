layui.define(["http", "hand", "form"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		hand = layui.hand;

	var $ = layui.$,
		lay = layui.layer,
		form = layui.form;

	var id = hand.locaStr("id");

	var idYi = "",
		idEr = "";
	// 一级检索框
	function getYiFn() {
		http({
			url: urls.find1,
			type: "get",
			data: {
				id: id
			},
			success: function(res) {
				var data = res.data;
				console.log(data)
				var str = '<option value="">请选择</option>';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var is = dataItem.disabled;
					if (is == 0) {
						str += '<option disabled lay-type="' + dataItem.static + '" value="' + dataItem.id + '">' + dataItem.title +
							'</option>';
					} else {
						str += '<option lay-type="' + dataItem.static + '" value="' + dataItem.id + '">' + dataItem.title +
							'</option>';
					};
				};
				$("#idxYi").html(str);
				$("#idxYi option").each(function(index, emelent) {
					var is = $(this).prop("disabled");
					if (index > 0 && !is) {
						$("#idxYi option").eq(index).prop("selected", 'selected');
						return false;
					};
				});
				getErFn();
			}
		});
	};
	getYiFn();
	// 一级筛选框切换
	form.on('select(idxYi)', function(data) {
		idYi = data.value;
		getErFn();
	});
	// 二级检索框
	function getErFn() {
		idYi = $("#idxYi").val();
		http({
			url: urls.find2,
			type: "get",
			data: {
				id1: id,
				id2: idYi
			},
			success: function(res) {
				var data = res.data;
				var str = '<option value="">请选择</option>';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					if (i == 0) {
						str += '<option value="' + dataItem.id + '" selected>' + dataItem.title + '</option>';
					} else {
						str += '<option value="' + dataItem.id + '">' + dataItem.title + '</option>';
					};
				};
				$("#idxEr").html(str);
				if (data.length > 0) {
					idEr = data[0].id;
					if (data[0].id == 6666) {
						$("#idxErPar").addClass("idx-hide");
					} else {
						$("#idxErPar").removeClass("idx-hide");
					};
				} else {
					$("#idxErPar").addClass("idx-hide");
				};
				getSanFn();
			}
		});
	};
	form.on('select(idxEr)', function(data) {
		idEr = data.value;
		getSanFn();
	});
	// 三级检索框
	function getSanFn() {
		http({
			url: urls.find3,
			type: "get",
			data: {
				id: idYi,
				year: idEr
			},
			success: function(res) {
				var data = res.data;
				var str = '<option value="">请选择</option>';
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					if (i == 0) {
						str += '<option value="' + dataItem.id + '" selected>' + dataItem.title + '</option>';
					} else {
						str += '<option value="' + dataItem.id + '">' + dataItem.title + '</option>';
					};
				};
				$("#idxSan").html(str);
				if (data.length > 0) {
					$("#idxSanPar").removeClass("idx-hide");
					$("#idxSiPar").removeClass("idx-hide");
				} else {
					$("#idxSanPar").addClass("idx-hide");
					$("#idxSiPar").addClass("idx-hide");
				};
				getSiFn();
			}
		});
	};

	//级检索框
	function getSiFn() {
		var str = '<option value="0">全部</option>';
		for (var i = 1; i < 32; i++) {
			str += '<option value="' + i + '">' + i + '日</option>';
		};
		$("#idxSi").html(str);
		form.render("select");
	};
	
	// 查询
	form.on('submit(query)', function(data) {
		var data = data.field;
		toHtmlFn(data);
	});
	//加载不同的页面
	function toHtmlFn(data) {
		var type = $("#idxYi option:selected").attr("lay-type");
		var names = "";
		switch (Number(type)) {
			case 0:
				console.log("图片")
				// names = "imgPage";
				names = "page";
				break;
			case 1:
				console.log("pdf")
				// names = "pdfPage";
				names = "page1";
				break;
			case 2:
				console.log("图片表格")
				// names = "imgTab";
				names = "page2";
				break;
			case 3:
				console.log("表格")
				// names = "tabPage";
				names = "page3";
				break;
			default:
				console.log("默认")
				// names = "pdfsPage";
				names = "page4";
		};
		var src = "./" + names + ".html";
		var dom = '<iframe class="iframe" name=' + names + ' src=' + src + ' frameborder="0"></iframe>'
		$("#iframe").html(dom);
		setTimeout(function(){
			window.frames[names].comListFn(data);
		},500);
	};
	
	e("deta", {})
});
