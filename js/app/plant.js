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
					'/corn', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/soybean', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/wheat', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/xiangzhang', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/guihua', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/yinxing', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/ziwei', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/pushu', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/xuesong', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/dayenvzhen', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/luohansong', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/hongyeshinan', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/hongjimu', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/jinsennvzhen', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/haitong', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/faqing', {
						templateUrl: '/banxiandexiangmu/html/plant/artical.html',
						controller: 'ProduceController'
					})
				.when(
					'/articalDetail', {
						templateUrl: '/banxiandexiangmu/html/plant/articalDetail.html',
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

			if($location.path().indexOf('/corn') == 0) { // 如果是合同列表页
				produce.articals = [{
					type: "种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1234,
					content: "种植规模"
				}, {
					type: "产量",
					releaseTime: "2016-10-20",
					clickTimes: 1234,
					content: "产量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1234,
					content: "价格"
				}];
			} else if($location.path().indexOf('/soybean') == 0) {
				produce.articals = [{
					type: "种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "种植规模"
				}, {
					type: "产量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "产量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			} else if($location.path().indexOf('/wheat') == 0) {
				produce.articals = [{
					type: "种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					content: "种植规模"
				}, {
					type: "产量",
					releaseTime: "2016-10-20",
					clickTimes: 3000,
					content: "产量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 3000,
					content: "价格"
				}];
			} else if($location.path().indexOf('/xiangzhang') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "香樟全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "香樟年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "香樟价格"
				}];
			} else if($location.path().indexOf('/guihua') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			} else if($location.path().indexOf('/yinxing') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			} else if($location.path().indexOf('/ziwei') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/pushu') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/xuesong') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/dayenvzhen') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/luohansong') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/hongyeshinan') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/hongjimu') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/jinsennvzhen') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/haitong') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/faqing') == 0) {
				produce.articals = [{
					type: "全国种植规模",
					releaseTime: "2016-10-15",
					clickTimes: 1000,
					content: "全国种植规模"
				}, {
					type: "年销售量",
					releaseTime: "2016-10-20",
					clickTimes: 1000,
					content: "年销售量"
				}, {
					type: "价格",
					releaseTime: "2016-10-25",
					clickTimes: 1000,
					content: "价格"
				}];
			}else if($location.path().indexOf('/articalDetail') == 0) {
				produce.artical = {
					title: "半仙他哥的养猪计划",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					detail: "一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土地里钻出来， 嫩嫩的， 绿绿的。 园子里， 田野里， 瞧去， 一大片一大片满是的。 "
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