var http = require('http');
var request = require('sync-request');

var tickData = {};  // data store for each ticker
var nextEl = {};  // next element for each ticker

var nameCache = {}; // cache names

const CONSTANTS = require('./constants.js');
const VALID_EXCHANGES = CONSTANTS.VALID_EXCHANGES;

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


function getNewStock(ticker) {
    tickData[ticker] = [];

    var url = 'http://globalquotes.xignite.com/v3/xGlobalQuotes.json/GetBars?IdentifierType=Symbol&Identifier=' + ticker + '&StartTime=4/16/2015%209:30%20AM&EndTime=4/16/2015%2012:30%20pm&Precision=Seconds&Period=1&_token=6E10075F14A6447E94C8700F8CF7116A';
    var response = request('GET', url);
    var body = JSON.parse(response.getBody());

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
}

function getName(ticker) {
    if (nameCache[ticker]) {
        return nameCache[ticker];
    }

    var url = 'http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByIdentifier?IdentifierType=Symbol&Identifier=' + ticker + '&StartDate=4/16/2015&EndDate=4/16/2015&_token=6E10075F14A6447E94C8700F8CF7116A';
    var response = request('GET', url);
    var body = JSON.parse(response.getBody());

    for (var i = 0, length = body.length; i !== length; ++i) {
        if (VALID_EXCHANGES.indexOf(body[i].Exchange) !== -1) {
            nameCache[ticker] = body[i].Name;
            return body[i].Name;
        }
    }

    return null;
}

module.exports = {
    getNext: getNext,
    getLastN: getLastN,
    getNewStock: getNewStock,
    getName: getName
};
