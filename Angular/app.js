var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('StockController', function($scope, $log, $filter) {
	$scope.message = 'twitch plays stock market';
	$log.info($scope);
	$log.info($scope.message);
	console.log("helllloo");
});

console.log("test");