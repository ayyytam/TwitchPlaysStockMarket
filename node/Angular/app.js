var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {
	$scope.stocks = [];

	//TODO this is dummy data
	$scope.stocks = [{ticker: "GOOG", name: "Google", price: 234.34},
					{ticker: "AAPL", name: "Apple", price: 453.54},
					{ticker: "BLAH", name: "Blah Blah Blah", price: 32.88}];
	this.stocks = $scope.stocks;

	//TODO
	$scope.addStock = function(newStock) {
		$scope.stocks.push(newStock);
	};

	//TODO
	$scope.removeStock = function(ticker) {};

	$scope.remaining = function() {
    	return $scope.stocks.length;
  	};

  	console.log($scope.stocks.length);
});

