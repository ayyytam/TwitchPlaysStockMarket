
# FinTechHack2015
### Inspired by Twitch Plays Pokemon
![alt text](doc/screenshots/2015-04-19-111926_1366x768_scrot.png "Logo Title Text 1")

# Setup Instructions
* In top directory, run node server.js
* Go to localhost:3000

# MISC
The frontend expects the server to pass JSON object with the following structure in order to update:

```json
{
    cash: 0,
    initialValue: 0,
    portfolioValue: 0,
    holdings: [{
                    ticker: <ticker symbol>,
                    name: <name of company>,
                    price: [<array of historical prices>],
                    quantity: <shares held>
               },
               {
                    ticker: <ticker symbol2>,
                    name: <name of company2>,
                    price: [<array of historical prices>],
                    quantity: 0
               }, ...]
}
```