const COMMANDS = {
    BUY: "buy",
    SELL: "sell"
};

const ACTIONS = {
    MARKET: "mkt",
    LIMIT: "limit"
};

function displayHoldings() {
    var str = "";
    for (x in utils.data) {
        str += x + ": " + utils.data[x];
    }
    return str;
}

function executeMarketOrder(command, ticker, quantity) {
    var price = getPrice(ticker);
    var pastVerb;
    if (action === COMMANDS.BUY) {
        if (price * quantity > utils.data.cash) {
            return "Insufficient funds";
        }
        pastVerb = "Bought";
    }
    else if (action === COMMANDS.SELL) {
        if (quantity > utils.data[ticker]) {
            return "Insufficient holdings";
        }
        quantity *= -1;
        pastVerb = "Sold";
    }
    
    utils.data.cash -= price * quantity;
    utils.data[ticker] += quantity;
    return pastVerb + " " + quantity + " shares of " +
        ticker.toUpperCase() + " for " + price + " each";
}

var utils = {
    parseMessage: function (message) {
        console.log("parseMessage", message);
        if (message && message.charAt(0) === "!") {
            console.log("this is a command");
            // This is a command
            var tokens = message.toLowerCase().split();
            var command = tokens[0].substr(1);

            switch (command) {
            case COMMANDS.BUY:
            case COMMANDS.SELL:
                var ticker = tokens[1];
                var quantity = parseInt(tokens[2]);
                var action = tokens[3];

                switch (action) {
                case ACTIONS.MARKET:
                    return executeMarketOrder(command,
                                              ticker,
                                              quantity);
                case ACTIONS.LIMIT:
                    var strike = parseDouble(tokens[4]);
                    // TODO limit order
                    break;
                default:
                    // TODO unrecognized action
                }
                
                break;
            default:
                // TODO unrecognized command
                break;
            }
        }
    }
}

module.exports = utils;
