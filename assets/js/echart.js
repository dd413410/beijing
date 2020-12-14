layui.define(["http"], function(e) {
	var http = layui.http,
		urls = layui.urls;

	var $ = layui.$,
		lay = layui.layer;

	window.comListFn = function(data) {
		http({
			url: urls.getLine,
			type: "get",
			data: data,
			success: function(res) {
				var data = res.data;
				myChart.setOption({
					title:{
						text:data.title
					},
					xAxis: [{
						data: data.data,
					}],
					series: [{
						data: data.value
					}]
				})
				
			}
		});
	};

	var myChart = echarts.init(document.getElementById('main'));

	function initFn() {
		// var data = {
		// 	title: "1981年AO数据",
		// 	data: ['非常活跃', '活跃', '一般', '差'],
		// 	value: [127, 224, 120, 278, 227, 237]
		// };
		var option = {
			backgroundColor: '#091c42',
			title: {
				left: 'center',
				// text: '学生活跃度分析',
				textStyle: {
					color: '#07a6ff',
					fontSize: '18',
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					backgroundColor: '#07a6ff'
				}
			},
			grid: {
				left: '3%',
				right: '3%',
				top: '10%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				// data: data.data,
				axisLabel: {
					color: '#07a6ff',
				},
				axisLine: {
					lineStyle: {
						color: '#07a6ff'
					},
					onZero:false
				},
				axisTick:{
					show:true
				}
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					color: '#07a6ff'
				},
				splitLine: {
					lineStyle: {
						color: '#07a6ff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#07a6ff'
					}
				}
			}],
			series: [{
				type: 'line',
				smooth: true,
				// data: data.value,
				itemStyle: {
					normal: {
						color: '#07d8b1',
						lineStyle: {
							color: '#07d8b1'
						},
					},
					emphasis: {
						color: '#02675f',
						lineStyle: {
							width: 0.5,
							type: 'dotted',
							color: "#02675f"
						}
					}
				}
			}]
		};
		myChart.setOption(option);
	};
	initFn();


	e("echart", {})
});
