layui.define(["http", "hand", "form", "table"], function(e) {
	var http = layui.http.http,
		urls = layui.urls,
		loads = layui.http.loads,
		hand = layui.hand;

	var $ = layui.$,
		lay = layui.laye,
		form = layui.form,
		table = layui.table;


	var id = hand.locaStr("id"),
		time = "01";
		
	function getDataFn() {
		table.render({
			elem: '#table',
			url: urls.search,
			where: {
				id: id,
				time: time
			},
			request: {
				pageName: 'pageNum',
				limitName: 'pageSize'
			},
			parseData: function(res) {
				return {
					"code": 0,
					"count": res.count,
					"data": res.data
				};
			},
			cols: [
				[{
					title: '日期',
					templet: function(d) {
						return d.fields.Time;
					}
				}, {
					title: '文件名',
					templet: function(d) {
						return d.fields.fileName;

					}
				}, {
					title: '实际文件大小',
					templet: function(d) {
						return d.fields.relayNum;
					}
				}, {
					title: '下载文件大小',
					templet: function(d) {
						return d.fields.totalNum;
					}
				}]
			],
			page: {
				layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
				groups: 5
			},
			limits: [10]
		});
	};
	getDataFn();







	//监听提交
	form.on('submit(formBtn)', function(data) {
		console.log(data)
		time = data.field.time;
		getDataFn();
	});

	e("datas", {})
});
