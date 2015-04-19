var constants = {
    VALID_EXCHANGES: [
        "ARCX", // NYSE ARCA
        "XNAS", // NASDAQ
    ],
    COMMANDS: {
        HELP: "help",
        BUY: "buy",
        SELL: "sell",
        PORTFOLIO: "display"
    },
    ACTIONS: {
        MARKET: "mkt",
        LIMIT: "limit"
    },
    ERROR_MESSAGE: "Command not recognized",
    INVALID_TICKER_MESSAGE: "Ticker is invalid",
    LOW_VOLUME_MESSAGE: "Trade not fulfilled - volume is too low",
    HELP_MESSAGE: "Commands should be in the following format: " +
        "!action ticker quantity type. " +
        "For example, !buy goog 100 mkt or !sell aapl 50 mkt",
};

module.exports = constants;
