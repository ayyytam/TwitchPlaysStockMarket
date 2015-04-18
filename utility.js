const COMMANDS = {
    HELP: "help",
    BUY: "buy",
    SELL: "sell",
    PORTFOLIO: "display"
};

const ACTIONS = {
    MARKET: "mkt",
    LIMIT: "limit"
};

const ERROR_MESSAGE = "Command not recognized"

const HELP_MESSAGE = "Commands should be in the following format: " +
    "!action ticker quantity type. " +
    "For example, !buy goog 100 mkt or !sell aapl 50 mkt";

function displayHoldings() {
    var str = "cash: " + utils.data.cash + ", holdings: [";

    var hasHoldings = false;
    for (x in utils.data.holdings) {
        str += x + ": " + utils.data.holdings[x] + ", ";
        hasHoldings = true;
    }

    if (hasHoldings) {
        str = str.substr(0, str.length - 2);
    }

    str += "]";
    return str;
}

function getPrice(ticker) {
    return utils.DATA_SERVICE.getNext(ticker);
}

function executeMarketOrder(command, ticker, quantity) {
    var data = utils.data;
    var price = getPrice(ticker);
    if (isNaN(price) || isNaN(quantity)) {
        console.log(price, quantity);
        return ERROR_MESSAGE;
    }

    var pastVerb, multiplier;
    if (command === COMMANDS.BUY) {
        if (price * quantity > data.cash) {
            return "Insufficient funds";
        }
        multiplier = 1;
        pastVerb = "Bought";
    }
    else if (command === COMMANDS.SELL) {
        if (!data.holdings[ticker]
            || quantity > data[ticker].holdings) {
            return "Insufficient holdings";
        }
        multiplier = -1;
        pastVerb = "Sold";
    }

    data.cash -= price * quantity * multiplier;
    if (!data.holdings[ticker]) {
        data.holdings[ticker] = 0;
    }
    data.holdings[ticker] += quantity * multiplier;
    return pastVerb + " " + quantity + " shares of " +
        ticker.toUpperCase() + " for " + price + " each";
}

var utils = {
    parseMessage: function (message) {
        console.log("parseMessage", message);
        if (message && message.charAt(0) === "!") {
            console.log("this is a command");
            // This is a command
            var tokens = message.toLowerCase().split(/\s/);
            var command = tokens[0].substr(1);

            switch (command) {
            case COMMANDS.HELP:
                return HELP_MESSAGE;

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
                    return "Limit orders are not currently supported";

                default:
                    return ERROR_MESSAGE;
                }
                break;

            case COMMANDS.PORTFOLIO:
                return displayHoldings();

            default:
                return ERROR_MESSAGE;
            }
        }
    }
}

module.exports = utils;
