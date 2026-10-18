// storage.js
// Demonstrates localStorage and file exporting functionality

const STORAGE_KEY = 'nexus_inventory';

/**
 * Saves the inventory array to localStorage
 * @param {Array} inventory - The array of product objects
 */
export const saveInventory = (inventory) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    } catch (error) {
        console.error("Error saving inventory to localStorage:", error);
    }
};

/**
 * Loads the inventory array from localStorage
 * @returns {Array|null} The parsed inventory array or null if empty
 */
export const loadInventory = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
    } catch (error) {
        console.error("Error loading inventory from localStorage:", error);
    }
    return null;
};

/**
 * Clears the inventory data from localStorage
 */
export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Exports the inventory as a downloadable CSV file
 * @param {Array} inventory - The array of product objects
 */
export const exportInventoryCSV = (inventory) => {
    if (!inventory || inventory.length === 0) {
        alert("No inventory data to export.");
        return;
    }

    // Define CSV headers
    const headers = ["ID", "Name", "Price", "Quantity", "Category", "SKU", "Status", "Date Added"];
    
    // Map inventory items to CSV rows using array map()
    const rows = inventory.map(product => {
        return [
            product.id,
            `"${product.name}"`, // Quote strings to handle commas
            product.price,
            product.quantity,
            `"${product.category}"`,
            product.sku,
            product.status,
            product.createdAt
        ].join(",");
    });
    
    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // Create a Blob and generate a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nexus_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
