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
    "For example, !buy goog 100 mkt";

function displayHoldings() {
    var str = "";
    for (x in utils.data) {
        str += x + ": " + utils.data[x] + " ";
    }
    return str;
}

function getPrice(ticker) {
    return 1;
}

function executeMarketOrder(command, ticker, quantity) {
    var price = getPrice(ticker);
    var pastVerb, multiplier;
    if (command === COMMANDS.BUY) {
        if (price * quantity > utils.data.cash) {
            return "Insufficient funds";
        }
        multiplier = 1;
        pastVerb = "Bought";
    }
    else if (command === COMMANDS.SELL) {
        if (!utils.data[ticker] || quantity > utils.data[ticker]) {
            return "Insufficient holdings";
        }
        multiplier = -1;
        pastVerb = "Sold";
    }
    
    utils.data.cash -= price * quantity * multiplier;
    if (!utils.data[ticker]) {
        utils.data[ticker] = 0;
    }
    utils.data[ticker] += quantity * multiplier;
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
                    // TODO limit order
                    break;
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
