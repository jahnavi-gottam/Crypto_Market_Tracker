const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coinsData = [];
let filteredData = [];
let marketCapAsc = false;
let percentageAsc = false;

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const sortMarketCapBtn = document.getElementById("sortMarketCapBtn");
const sortPercentageBtn = document.getElementById("sortPercentageBtn");
const statusMessage = document.getElementById("statusMessage");

// 1. Fetch data using .then()
function fetchDataWithThen() {
    statusMessage.textContent = "Loading...";

    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            coinsData = extractCoinProperties(data);
            filteredData = [...coinsData];
            renderTable(filteredData);
            statusMessage.textContent = "";
        })
        .catch((error) => {
            console.error("Error fetching with .then():", error);
            statusMessage.textContent =
                "Unable to fetch data right now. Please try again in a moment.";
        });
}

// 2. Fetch data using async/await
async function fetchDataWithAsyncAwait() {
    statusMessage.textContent = "Loading...";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        coinsData = extractCoinProperties(data);
        filteredData = [...coinsData];
        renderTable(filteredData);
        statusMessage.textContent = "";
    } catch (error) {
        console.error("Error fetching with async/await:", error);
        statusMessage.textContent =
            "Unable to fetch data right now. Please try again in a moment.";
    }
}

// Extract required properties from API response
function extractCoinProperties(rawData) {
    return rawData.map((coin) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image,
        symbol: coin.symbol,
        current_price: coin.current_price,
        total_volume: coin.total_volume,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap: coin.market_cap,
    }));
}

// Render table rows matching the Figma screenshot
function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 28px; color: #aaaaaa;">
          No matching coins found.
        </td>
      </tr>
    `;
        return;
    }

    data.forEach((coin) => {
        const row = document.createElement("tr");
        row.dataset.id = coin.id;

        const pctValue =
            coin.price_change_percentage_24h !== null &&
                coin.price_change_percentage_24h !== undefined
                ? coin.price_change_percentage_24h.toFixed(2)
                : "0.00";

        const pctClass =
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative";

        row.innerHTML = `
      <td>
        <div class="coin-cell">
          <img src="${coin.image}" alt="${coin.name}" />
          <span>${coin.name}</span>
        </div>
      </td>
      <td class="symbol-cell">${coin.symbol.toUpperCase()}</td>
      <td class="price-cell">$${coin.current_price}</td>
      <td class="volume-cell">$${coin.total_volume.toLocaleString("en-US")}</td>
      <td class="percent-cell ${pctClass}">${pctValue}%</td>
      <td class="mktcap-cell">Mkt Cap : $${coin.market_cap.toLocaleString("en-US")}</td>
    `;

        tableBody.appendChild(row);
    });
}

// Live search by name or symbol
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    filteredData = coinsData.filter(
        (coin) =>
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
    );

    renderTable(filteredData);
}

// Sort by Market Cap
function sortByMarketCap() {
    marketCapAsc = !marketCapAsc;
    filteredData.sort((a, b) =>
        marketCapAsc ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
    );
    renderTable(filteredData);
}

// Sort by 24h Percentage Change
function sortByPercentage() {
    percentageAsc = !percentageAsc;
    filteredData.sort((a, b) =>
        percentageAsc
            ? a.price_change_percentage_24h - b.price_change_percentage_24h
            : b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderTable(filteredData);
}

// Event listeners
searchInput.addEventListener("input", handleSearch);
sortMarketCapBtn.addEventListener("click", sortByMarketCap);
sortPercentageBtn.addEventListener("click", sortByPercentage);

// Initial fetch (switch between fetchDataWithAsyncAwait() and fetchDataWithThen() as needed)
fetchDataWithAsyncAwait();