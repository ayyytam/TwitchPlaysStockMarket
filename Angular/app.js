var twitchPlaysStockMarket = angular.module('twitchPlaysStockMarket', []);

twitchPlaysStockMarket.controller('DashboardController', function($scope, $log, $filter) {

	//Initial Value
	$scope.data = {cash: 0,
				   initialValue: 0,
				   portfolioValue: 0,
				   holdings: [{ticker: "", name: "", price: [], quantity: 0}]
				};
	this.stocks = $scope.data.holdings;
	$scope.charts = []; //TODO might not need this

	//***********************METHODS***********************//

	$scope.addStock = function(newStock) {
		$scope.stocks.push(newStock);
		console.log(newStock.ticker + " was added to the portfolio!");
	};

	$scope.removeStock = function(ticker) {
		_.remove($scope.stocks, function(stock) {
			return stock.ticker == ticker;
		});
		console.log( "Stock with ticker " + ticker + " was removed from the portfolio");
	};

  	$scope.getNetGainLoss = function() {
  		return $scope.data.portfolioValue - $scope.data.initialValue;
  	};

  	$scope.getCash = function() {
  		return $scope.data.cash;
  	};

  	$scope.getPortfolioValue = function() {
  		return $scope.data.portfolioValue;
  	};

  	$scope.getNumberOfHoldings = function() {
    	return $scope.data.holdings.length;
  	};

  	$scope.getChartTickerClass = function(stock) {
  		return stock.ticker;
  	};

  	$scope.initializeStockCharts = function() {
  		$scope.data.holdings.forEach(function(holding) {
			var tickerContainerName = ".ticker-" + holding.ticker;
			$(function () {
			    $(tickerContainerName).highcharts({
			        chart: {
			            zoomType: 'x'
			        },
			        title: {
			            text: null//TODO add something here
			        },
			        subtitle: {
			        },
			        xAxis: {
			            //type: 'datetime',
			            minRange: 14 * 24 * 3600000 // fourteen days
			        },
			        yAxis: {
			            title: {
			                text: 'Price ($)'
			            }
			        },
			        legend: {
			            enabled: false
			        },
			        plotOptions: {
			            area: {
			                fillColor: {
			                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
			                    stops: [
			                        [0, Highcharts.getOptions().colors[0]],
			                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			                    ]
			                },
			                marker: {
			                    radius: 2
			                },
			                lineWidth: 1,
			                states: {
			                    hover: {
			                        lineWidth: 1
			                    }
			                },
			                threshold: null
			            },
						series: {
							animation: false
						}
			        },

			        series: [{
			            type: 'area',
			            pointInterval: 24 * 3600 * 1000,
			            data: holding.price,
						name: holding.name
			        }]
			    });
				//TODO Add chart updater here?
			});
		});
	};

  	$scope.updateStockCharts = function() {
  	};

  	$scope.initializeStockCharts();
  	var socket = io();

	// Handle sending messages
	$('#chat-window form').submit(function() {
		if ($.trim($('#m').val())) {
			chatData = { msg: $('#m').val(),
			             userid: userid
					};
			var chatJSON = JSON.stringify(chatData);
		    socket.emit('chat message', chatJSON);
		    $('#m').val('');
		}
	    return false;
	});

	var userid = 'Unknown';

	// Handle receiving messages
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
		$('#chat-scroll').scrollTop($('#chat-scroll')[0].scrollHeight);
	});

	socket.on('userid', function(msg) {
		userid = msg;
	});

	// Handle receiving market data
	var that = this;
	socket.on('portfolio data', function(msg) {
	    slug = JSON.parse(msg);
	    $scope.data = slug;
	    $scope.$apply();
	    $scope.initializeStockCharts();
	    that.stocks = $scope.data.holdings;
	});
});

// Custom Filter for displaying Gain/Loss
twitchPlaysStockMarket.filter('gainLossFilter', ['$filter', function ($filter) {
	return function (input) {
		return (input > 0 ? "+" : "") + $filter('currency')(input);
	};
}]);

// Parallax Scrolling
var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}


// Scrolling Stuff
var stickyTop = $('.sticky').offset().top; // returns number
$(window).scroll(function(e){
    parallax(); //parallax scrolling
	var windowTop = $(window).scrollTop(); // returns number
	if (stickyTop < windowTop) {
		$('.sticky').css({ position: 'fixed', top: 0 });
	} else {
		$('.sticky').css('position','static');
	}
});
