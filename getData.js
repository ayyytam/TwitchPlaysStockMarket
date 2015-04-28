'use strict';
var Promise = require('bluebird');
var http = Promise.promisifyAll(require('superagent'));

var tickData = {};  // data store for each ticker
var nextEl = {};  // next element for each ticker

var nameCache = {}; // cache names

var CONSTANTS = require('./constants.js');
var VALID_EXCHANGES = CONSTANTS.VALID_EXCHANGES;

function getNewStock(ticker) {
    tickData[ticker] = [];

    var url = 'http://globalquotes.xignite.com/v3/xGlobalQuotes.json/GetBars?IdentifierType=Symbol&Identifier=' + ticker + '&StartTime=4/16/2015%209:30%20AM&EndTime=4/16/2015%2012:30%20pm&Precision=Seconds&Period=1&_token=6E10075F14A6447E94C8700F8CF7116A';
    http.getAsync(url)
    .then(function(response) {
        var body = JSON.parse(response.body);
        if (!body.Bars || body.Bars.length < 200) {
            return false;
        }

        body.Bars.forEach(function(bar) {
            tickData[ticker].push(bar.Close);
        });
        // Start data somewhere in the middle, so that historical pulls will have
        // some history.
        nextEl[ticker] = 100;
        return true;
    })
    .catch(function(error) {
        console.error('Error occurred fetching data: ', error.message);
        console.trace(error);
        // TODO handle this
        //throw new Error(error.message);
        return false;
    });
}

function getName(ticker) {
    if (nameCache[ticker]) {
        return nameCache[ticker];
    }

    var url = 'http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByIdentifier?IdentifierType=Symbol&Identifier=' + ticker + '&StartDate=4/16/2015&EndDate=4/16/2015&_token=6E10075F14A6447E94C8700F8CF7116A';
    http.getAsync(url)
    .then(function(response) {
        var body = JSON.parse(response.body);
        for (var i = 0, length = body.length; i !== length; ++i) {
            if (VALID_EXCHANGES.indexOf(body[i].Exchange) !== -1) {
                nameCache[ticker] = body[i].Name;
                return body[i].Name;
            }
        }
    })
    .catch(function(error) {
        console.error('Error occurred fetching data: ', error.message);
        console.trace(error);
        // TODO rethrow?
        return null;
    });
}

function getNext(ticker) {
    if (!tickData.hasOwnProperty(ticker)) {
        getNewStock(ticker);
    }
    return tickData[ticker][nextEl[ticker]++];
}

function getLastN(ticker, n) {
    if (!tickData.hasOwnProperty(ticker)) {
        getNewStock(ticker);
    }
    var firstEl = Math.max(0, nextEl[ticker] - n);
    var lastEl = nextEl[ticker];
    return tickData[ticker].slice(firstEl, lastEl);
}

module.exports = {
    getNext: getNext,
    getLastN: getLastN,
    getNewStock: getNewStock,
    getName: getName
};
