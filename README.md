# Crypto Market Tracker

A dark-themed cryptocurrency market tracker built with HTML, CSS, and Vanilla JavaScript. It fetches live data for the top 10 cryptocurrencies from the CoinGecko API and supports real-time search and sorting.

## Live Demo

[View Live App](https://jahnavi-gottam.github.io/Crypto_Market_Tracker/)

## Features

- **Dual Promise Handling:** Implements API data fetching using both `.then()` (`fetchDataWithThen`) and `async/await` (`fetchDataWithAsyncAwait`).
- **Live Market Data:** Displays coin icon, name, symbol, current price, 24h total volume, 24h percentage change (color-coded green/red), and market cap.
- **Instant Search:** Filter cryptocurrencies in real time by name or symbol.
- **Sorting:** Toggle ascending/descending sort by **Market Cap** or **24h Percentage Change**.
- **Responsive Dark UI:** Matches the minimalist dark table layout with clean horizontal dividers.

## API Endpoint

Data is fetched from the public CoinGecko Markets API:

```text
[https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false)
