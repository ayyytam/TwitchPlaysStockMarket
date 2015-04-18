const COMMANDS = {
    BUY: "buy",
    SELL: "sell"
};

const ACTIONS = {
    MARKET: "mkt",
    LIMIT: "limit"
};

var utils = {
    parseMessage: function (message) {
        console.log("parseMessage", message);
        if (message && message.charAt(0) === "!") {
            // This is a command
            var tokens = message.toLowerCase().split();
            var command = tokens[0].substr(1);

            switch (command) {
            case COMMANDS.BUY:
            case COMMANDS.SELL:
                var quantity = parseInt(tokens[1]);
                var action = tokens[2];

                switch (action) {
                case ACTIONS.MARKET:
                    // TODO market order
                    break;
                case ACTIONS.LIMIT:
                    var strike = parseDouble(tokens[3]);
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
