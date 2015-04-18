# FinTechHack2015

##Idea Brainstorm
###Twitter Stock Ranking Stack
* Description: Have a single page app which displays a number of panels ordered vertically like a stack. Each panel will represent a particular stock which you would like to track (Panel could display price + actual stock graph + sample tweets etc...). The application will automatically order the stocks based on twitter activity. If a stock is particularly “hot” at the moment, the panel that represents this stock will move to the top of the stack. We could work in sentiment analysis.
* Potential additions:
	* Break into Fama French 3 factor dimensions
	* Implied risk from portfolio
	* Sentiment Diversification?
* APIs: Twitter, Stocktwits, OANDA?, ChartIQ
* Technologies: Angular, Node, MongoDB, D3, HighCharts
* Difficulty: 3.5/5
* Pro: Useful, Easy to understand, Relevant, Feasible.
* Cons: Not super interesting.

###Multidimensional Stock Visualizer (Look into Codepen for ideas)
* Description: Based on dimensions that we set (eg. X axis => Stock Price, Y axis => Sentiment Score), display stocks as moving dots/blobs that change in size and colors and move around in the N-dimensional space)
* Pros: Could look cool, relevant, visually appealing
* Cons: Making it look cool might be a challenge.

###Stock Chart Music Player
* Description: You type in a random stock ticker and time range. You retrieve the time series for that stock. Press play button to play song based on ticker prices overtime.
* Pros: Fun. Creative.
* Cons: USELESS.

###Twitch Plays Stock Market!!!
* Business Case: Investors buy into fund, and can execute buy / sell orders against a portfolio.
* Alternatively: “Make your own index”
* Description: Borrowing the idea of Twitch Plays Pokemon, we use user input on a chat console/tweets or whatever to fuel the buying and selling of stocks and see how much fake money we gain or lose. The actual display can show net gain/loss, current stock holdings (display charts inside panels) and other misc data pulled in from partner APIs. We can also add chat bots to make random/stupid ass trades to make things more interesting.
* Pros: Hilarious/Genius.
* Cons: None.
* Resources:
https://github.com/Francesco149/OpenTwitchPlays
Thoughts
* Input source: Twitch? Twitter?
* APIs:
Quantconnect

## API List

### Market Data
* xignite
* Tagnify: Investment Grade Fundamental Data, End of Day Equities Market Data

### Market Analysis
* Psychsignal: Get indications of direction of markets based on sentiment analysis
* ChartIQ: Technical Analysis
* Stocktwit: Aggregation of social data for equities
* Estimize: Platform for earnings forecasts

### Development / Infra
* MongoDB: Document-based Database
* OpenShift: Cloud development, hosting, 
* openFin: Secure HTML5 runtime to run HTML5 apps faster outside of a browser
* context.io: Sync email with your app

## Miscellaneous
* Oanda: Forex Trading
* Zipmark: Digital Check payment
* MasterCard: Payments, Security, Business Data, Card Data

## Unclassified
* Quantconnect: Research, backtest, and trade your investments
* Vestorly
* Quovo: Data science for the art of investing







