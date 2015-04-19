var constants = {
    VALID_EXCHANGES: [
        "ARCX", // NYSE ARCA
        "XNAS", // NASDAQ
    ],
    COMMANDS: {
        HELP: "help",
        BUY: "buy",
        SELL: "sell",
        QUOTE: "quote",
        PORTFOLIO: "display",
        BOT: "bots"
    },
    ACTIONS: {
        MARKET: "mkt",
        LIMIT: "limit"
    },
    ERROR_MESSAGE: "Command not recognized",
    INVALID_TICKER_MESSAGE: "Ticker is invalid",
    LOW_VOLUME_MESSAGE: "Volume is too low to trade",
    HELP_MESSAGE: "Trade commands should be in the following format: " +
        "![buy|sell] [ticker] [quantity] [type]. " +
        "For example, !buy goog 100 mkt or !sell aapl 50 mkt. " +
        "Quote commands should be in the following format: " +
        "!quote [ticker]. For example, !quote tsla.",
    // interval (milliseconds) for updating frontend
    BOT_UPD_INTERVAL: 3100

};

module.exports = constants;
