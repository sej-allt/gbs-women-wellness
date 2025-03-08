// Financial Data
const financialData = [
    { title: "Income", value: "$4,500", color: "#3498db", icon: "fa-money-bill-wave" },
    { title: "Expenses", value: "$2,500", color: "#e74c3c", icon: "fa-shopping-cart" },
    { title: "Savings", value: "$8,000", color: "#2ecc71", icon: "fa-piggy-bank" },
    { title: "Goals", value: "Travel fund, Emergency fund", color: "#f1c40f", icon: "fa-chart-line" }
];

// Function to Render Cards
function renderCards() {
    const cardContainer = document.getElementById("cardContainer");

    financialData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <i class="fas ${item.icon} icon" style="color: ${item.color};"></i>
            <h2>${item.title}</h2>
            <p>${item.value}</p>
        `;

        cardContainer.appendChild(card);
    });
}

// Load Cards on Page Load
document.addEventListener("DOMContentLoaded", renderCards);
