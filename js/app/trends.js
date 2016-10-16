var app = angular
	.module(
		'produce', ['ngRoute'],
		function($httpProvider) { // ngRoute引入路由依赖
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

			// Override $http service's default transformRequest
			$httpProvider.defaults.transformRequest = [function(data) {
				/**
				 * The workhorse; converts an object to
				 * x-www-form-urlencoded serialization.
				 * 
				 * @param {Object}
				 *            obj
				 * @return {String}
				 */
				var param = function(obj) {
					var query = '';
					var name, value, fullSubName, subName, subValue, innerObj, i;

					for(name in obj) {
						value = obj[name];

						if(value instanceof Array) {
							for(i = 0; i < value.length; ++i) {
								subValue = value[i];
								fullSubName = name + '[' + i + ']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += param(innerObj) + '&';
							}
						} else if(value instanceof Object) {
							for(subName in value) {
								subValue = value[subName];
								fullSubName = name + '[' + subName +
									']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += param(innerObj) + '&';
							}
						} else if(value !== undefined &&
							value !== null) {
							query += encodeURIComponent(name) + '=' +
								encodeURIComponent(value) + '&';
						}
					}

					return query.length ? query.substr(0,
						query.length - 1) : query;
				};

				return angular.isObject(data) &&
					String(data) !== '[object File]' ? param(data) :
					data;
			}];
		});

app.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(evt, next, previous) {
		console.log('路由跳转成功');
		$rootScope.$broadcast('reGetData');
	});
}]);

// 路由配置
app
	.config([
		'$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when(
					'/current', {
						templateUrl: '/banxiandexiangmu/html/trends/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/tendency', {
						templateUrl: '/banxiandexiangmu/html/trends/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/feedstuff', {
						templateUrl: '/banxiandexiangmu/html/trends/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/futures', {
						templateUrl: '/banxiandexiangmu/html/trends/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/articalDetail', {
						templateUrl: '/banxiandexiangmu/html/trends/articalDetail.html',
						controller: 'ProduceController'
					})

		}
	]);
app.constant('baseUrl', '/CIMS/');
app.factory('services', ['$http', 'baseUrl', function($http, baseUrl) {
	var services = {};
	services.getContractList = function(data) {
		/* console.log("发送请求获取合同信息"); */
		return $http({
			method: 'post',
			url: baseUrl + 'contract/getContractList.do',
			data: data
		});
	};

	return services;
}]);

app.controller('ProduceController', [
	'$scope',
	'services',
	'$location',
	function($scope, services, $location) {
		// 养殖
		var produce = $scope;

		// 获取欠款合同
		/*contract.getDebtContract = function() {
			services.getDebtContract({}).success(function(data) {
				console.log("获取欠款合同成功！");
				contract.contracts = data;
			});
		};*/
		// 获取逾期合同

		// 初始化页面信息
		function initData() {
			console.log("初始化页面信息");

			if($location.path().indexOf('/current') == 0) { // 如果是合同列表页
				produce.articals = [{
					type: "同行现状",
					releaseTime: "2016-10-16",
					clickTimes: 2000,
					content: "当前，我国畜、禽产品的安全质量存在很多问题，和世界发达国家相比存在较大差距。突出表现在：一是畜、禽疾病种类多，发病范围广；二是畜、禽产品中农药残留、兽药残留、重金属含量等严重超标；三是畜、禽疫病、兽药残留、饲料质量、饲料添加剂、兽药质量等检测技术落后，监制体系步完善；四是标准体系建设滞后，在很多方面缺乏强制性技术标准，各项技术水平远远落后于同行水平；五是法制体系建设滞后，畜、禽产品安全质量控制方面或者在某个方面缺乏必要的法律法规；六是中介组织发展缓慢，政府和企业间缺乏必要的管理组织。"
				}/*, {
					type: "法规2",
					releaseTime: "2016-10-20",
					clickTimes: 2000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}, {
					type: "法规3",
					releaseTime: "2016-10-25",
					clickTimes: 2000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}*/];
			} else if($location.path().indexOf('/tendency') == 0) {
				produce.articals = [{
					type: "趋势",
					releaseTime: "2016-10-16",
					clickTimes: 1230,
					content: "绿色无公害产品成为发展趋势，畜禽养殖业的科技水平有待提高。我国是一个养殖大国，其中禽类存栏数量40亿只，位居世界第一，但我国畜牧产品出口贸易非常萧条。2006年数据显示我国活鸡，鸡肉蛋类出口额仅占世界出口总额60306亿美元的0.28%，即便如此，2007年欧盟26个成员国及日、韩等国还因为我国动物性产品抗生素残留超标，决定暂停进口我国的动物源性产品，2008年和2009年形势有所了改善，但是食品安全问题频发，状况还是不容乐观。这些问题不解决，我国的农产品很难走出国门。"
				}/*, {
					type: "方案2",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}, {
					type: "方案3",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}*/];
			} else if($location.path().indexOf('/feedstuff') == 0) {
				produce.articals = [{
					type: "饲料",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}/*, {
					type: "设施2",
					releaseTime: "2016-10-20",
					clickTimes: 3000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}, {
					type: "设施3",
					releaseTime: "2016-10-25",
					clickTimes: 3000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}*/];
			} else if($location.path().indexOf('/futures') == 0) {
				produce.articals = [{
					type: "大豆期货走势",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					content: "在经济全球化的今天，由于国际间的贸易往来和信息传递，整个世界已经构成一个大市场，商品价格的变化不仅受到一国或区域内供求关系的影响，从根本上讲是受到全球供求关系的影响，因此对价格变化的研究应该放眼全球，否则就会放大局部性信息和片段信息产生的影响，从而产生甚至方向相反的预期偏差，给经营与投资行为带来损失。"
				}/*, {
					type: "设施2",
					releaseTime: "2016-10-20",
					clickTimes: 3000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}, {
					type: "设施3",
					releaseTime: "2016-10-25",
					clickTimes: 3000,
					content: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。"
				}*/];
			} else if($location.path().indexOf('/articalDetail') == 0) {
				produce.artical = {
					title: "半仙他哥的养猪计划",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					detail: "国际走势具体内容 "
				}
			}
		}

		initData();

	}
]);

// 合同状态过滤器
app.filter('conState', function() {
	return function(input) {
		var state = "";
		if(input == "0")
			state = "在建";
		else if(input == "1")
			state = "竣工";
		else if(input == "2")
			state = "停建";
		return state;
	}
});