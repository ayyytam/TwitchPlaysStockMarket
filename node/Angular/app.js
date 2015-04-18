var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {
	$scope.message = 'twitch plays stock market';
	this.stocks = [{ticker: "GOOG", name: "Google"},
					{ticker: "AAPL", name: "Apple"},
					{ticker: "BLAH", name: "Blah Blah Blah"}];
	$log.info($scope.stocks);
	$log.info($scope.message);
});	