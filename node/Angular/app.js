var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {
	$scope.message = 'twitch plays stock market';
	$scope.stocks = {GOOG: "Google", AAPL: "Apple", BLAH: "Blah"};
	//$scope.stocks = ["asdfa", "asdfasdf", "adfasdfads"];
	$log.info($scope);
	$log.info($scope.message);
	console.log("helllloo");
});	