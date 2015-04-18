var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {
	$scope.stocks = [];

	//TODO this is dummy data
	$scope.stocks = [{ticker: "GOOG", name: "Google", price: 234.34},
					{ticker: "AAPL", name: "Apple", price: 453.54},
					{ticker: "BLAH", name: "Blah Blah Blah", price: 32.88}];
	this.stocks = $scope.stocks;

	//TODO Needs to be called by server
	$scope.addStock = function(newStock) {
		$scope.stocks.push(newStock);
	};

	//TODO
	$scope.removeStock = function(ticker) {
		
	};

	$scope.getNumberOfHoldings = function() {
    	return $scope.stocks.length;
  	};

  	//TODO
  	$scope.getNetGainLoss = function() {
  		return +23423.43;
  	};



  	$scope.addStock({ticker: "SDF", name: "Adfddd", price: 453.54})
});

twitchPlaysStockMarket.filter('gainLossFilter', ['$filter', function ($filter) {
	return function (input) {
		return (input > 0 ? "+" : "") + $filter('currency')(input);
	};
}]);

