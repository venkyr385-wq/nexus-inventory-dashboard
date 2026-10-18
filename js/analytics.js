// analytics.js
// Demonstrates array methods, arithmetic operators, and Chart.js integration

import { classifyProductPrice } from './inventory.js';

/**
 * Calculates the total number of products (unique items, not sum of quantities)
 */
export const calculateTotalProducts = (inventory) => {
    return inventory.length;
};

/**
 * Calculates the total inventory value (sum of price * quantity)
 * Demonstrates: Array reduce(), arithmetic operators
 */
export const calculateInventoryValue = (inventory) => {
    return inventory.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
};

/**
 * Calculates the average unit price of all distinct products
 * Demonstrates: Array reduce(), arithmetic operators
 */
export const calculateAveragePrice = (inventory) => {
    if (inventory.length === 0) return 0;
    
    const sumOfPrices = inventory.reduce((total, product) => total + product.price, 0);
    return sumOfPrices / inventory.length;
};

/**
 * Counts how many products are low on stock (< 10)
 * Demonstrates: Array filter()
 */
export const getLowStockCount = (inventory) => {
    return inventory.filter(product => product.quantity > 0 && product.quantity < 10).length;
};

/**
 * Finds affordable products (price < 200)
 * Demonstrates: Array filter(), arrow functions
 */
export const getAffordableProducts = (inventory) => {
    return inventory.filter(product => product.price < 200);
};

/**
 * Generates a formatted string report for each product
 * Demonstrates: Array map(), string manipulation
 */
export const getFormattedReport = (inventory) => {
    return inventory.map(product => {
        return `${product.name.toUpperCase()}: ₹${product.price.toFixed(2)}`;
    });
};

/**
 * Calculates tax on a given amount
 * Demonstrates: Default parameters, arithmetic operators
 */
export const calculateTax = (amount, taxPercent = 10) => {
    return amount * (taxPercent / 100);
};

/**
 * Calculates discount on a given amount
 * Demonstrates: Default parameters, arithmetic operators
 */
export const calculateDiscount = (amount, discountPercent = 0) => {
    return amount * (discountPercent / 100);
};

/**
 * Calculates the final price after tax and discount
 */
export const calculateFinalPrice = (baseAmount, taxPercent, discountPercent) => {
    const discountAmount = calculateDiscount(baseAmount, discountPercent);
    const subtotal = baseAmount - discountAmount;
    const taxAmount = calculateTax(subtotal, taxPercent); // Tax applied after discount
    return {
        baseAmount,
        discountAmount,
        subtotal,
        taxAmount,
        finalAmount: subtotal + taxAmount
    };
};

// ==========================================
// Chart.js Integration
// ==========================================

let valueChartInstance = null;
let priceTierChartInstance = null;
let stockChartInstance = null;

// Common chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#a0a4b8' } }
    },
    scales: {
        x: { ticks: { color: '#a0a4b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#a0a4b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
};

const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: '#a0a4b8' } }
    }
};

/**
 * Initializes and updates all charts
 * @param {Array} inventory - Current inventory data
 */
export const updateCharts = (inventory) => {
    // Only update charts if the canvas elements exist (Analytics view)
    const ctxValue = document.getElementById('valueChart');
    if (!ctxValue) return;

    // 1. Data Prep for Charts
    const productNames = inventory.map(p => p.name);
    
    // Value Chart Data
    const productValues = inventory.map(p => p.price * p.quantity);
    
    // Price Tier Data
    let budgetCount = 0, standardCount = 0, premiumCount = 0;
    inventory.forEach(p => {
        const tier = classifyProductPrice(p.price);
        if (tier === 'Budget') budgetCount++;
        else if (tier === 'Standard') standardCount++;
        else premiumCount++;
    });
    
    // Stock Data
    const stockQuantities = inventory.map(p => p.quantity);

    // 2. Render or Update Value Chart (Bar)
    if (valueChartInstance) {
        valueChartInstance.data.labels = productNames;
        valueChartInstance.data.datasets[0].data = productValues;
        valueChartInstance.update();
    } else {
        valueChartInstance = new Chart(ctxValue, {
            type: 'bar',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Total Value (₹)',
                    data: productValues,
                    backgroundColor: 'rgba(139, 92, 246, 0.7)',
                    borderColor: 'rgb(139, 92, 246)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: chartOptions
        });
    }

    // 3. Render or Update Price Tier Chart (Doughnut)
    const ctxTier = document.getElementById('priceTierChart');
    if (priceTierChartInstance) {
        priceTierChartInstance.data.datasets[0].data = [budgetCount, standardCount, premiumCount];
        priceTierChartInstance.update();
    } else {
        priceTierChartInstance = new Chart(ctxTier, {
            type: 'doughnut',
            data: {
                labels: ['Budget (<₹50)', 'Standard (₹50-₹199)', 'Premium (₹200+)'],
                datasets: [{
                    data: [budgetCount, standardCount, premiumCount],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.7)', // Success green
                        'rgba(6, 182, 212, 0.7)',  // Cyan
                        'rgba(139, 92, 246, 0.7)'  // Violet
                    ],
                    borderColor: 'rgba(22, 25, 37, 1)',
                    borderWidth: 2
                }]
            },
            options: pieOptions
        });
    }

    // 4. Render or Update Stock Distribution Chart (Line/Bar)
    const ctxStock = document.getElementById('stockChart');
    if (stockChartInstance) {
        stockChartInstance.data.labels = productNames;
        stockChartInstance.data.datasets[0].data = stockQuantities;
        stockChartInstance.update();
    } else {
        stockChartInstance = new Chart(ctxStock, {
            type: 'bar',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Units in Stock',
                    data: stockQuantities,
                    backgroundColor: 'rgba(6, 182, 212, 0.7)',
                    borderColor: 'rgb(6, 182, 212)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: chartOptions
        });
    }
};
