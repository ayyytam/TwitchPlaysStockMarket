var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {
	$scope.message = 'twitch plays stock market';

	//TODO this is dummy data
	this.stocks = [{ticker: "GOOG", name: "Google", price: 234.34},
					{ticker: "AAPL", name: "Apple", price: 453.54},
					{ticker: "BLAH", name: "Blah Blah Blah", price: 32.88}];
	$log.info($scope.stocks);
	$log.info($scope.message);
});	