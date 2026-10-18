// inventory.js
// Handles product data, validation, classification, and CRUD operations

export const initialProducts = [
    { 
        id: 'prod_' + Date.now() + '1', 
        name: 'Laptop', 
        price: 800, 
        quantity: 10, 
        category: 'Electronics', 
        sku: 'LAP-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '2', 
        name: 'Mouse', 
        price: 25, 
        quantity: 50, 
        category: 'Accessories', 
        sku: 'MOU-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '3', 
        name: 'Keyboard', 
        price: 45, 
        quantity: 30, 
        category: 'Accessories', 
        sku: 'KEY-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '4', 
        name: 'Ergonomic Chair', 
        price: 150, 
        quantity: 15, 
        category: 'Furniture', 
        sku: 'ERG-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '5', 
        name: 'Office Desk', 
        price: 299, 
        quantity: 8, 
        category: 'Furniture', 
        sku: 'DES-001', 
        status: 'Low Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '6', 
        name: 'Filing Cabinet', 
        price: 85, 
        quantity: 0, 
        category: 'Furniture', 
        sku: 'FIL-001', 
        status: 'Out of Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '7', 
        name: '4K Monitor', 
        price: 320, 
        quantity: 12, 
        category: 'Electronics', 
        sku: 'MON-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '8', 
        name: 'Web Camera', 
        price: 65, 
        quantity: 45, 
        category: 'Electronics', 
        sku: 'WEB-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '9', 
        name: 'Wireless Headphones', 
        price: 120, 
        quantity: 25, 
        category: 'Electronics', 
        sku: 'AUD-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '10', 
        name: 'Mechanical Keyboard', 
        price: 110, 
        quantity: 18, 
        category: 'Accessories', 
        sku: 'KEY-002', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '11', 
        name: 'USB-C Hub', 
        price: 35, 
        quantity: 60, 
        category: 'Accessories', 
        sku: 'HUB-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '12', 
        name: 'Bookshelf', 
        price: 180, 
        quantity: 5, 
        category: 'Furniture', 
        sku: 'FUR-003', 
        status: 'Low Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '13', 
        name: 'Standing Desk', 
        price: 450, 
        quantity: 10, 
        category: 'Furniture', 
        sku: 'DES-002', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '14', 
        name: 'Gaming Mouse', 
        price: 85, 
        quantity: 2, 
        category: 'Accessories', 
        sku: 'MOU-002', 
        status: 'Low Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '15', 
        name: 'External Hard Drive 2TB', 
        price: 95, 
        quantity: 30, 
        category: 'Electronics', 
        sku: 'HDD-001', 
        status: 'In Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '16', 
        name: 'Conference Phone', 
        price: 250, 
        quantity: 4, 
        category: 'Electronics', 
        sku: 'PHO-001', 
        status: 'Low Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    },
    { 
        id: 'prod_' + Date.now() + '17', 
        name: 'Desk Lamp', 
        price: 45, 
        quantity: 0, 
        category: 'Furniture', 
        sku: 'LMP-001', 
        status: 'Out of Stock', 
        createdAt: new Date().toLocaleString('en-US') 
    }
];

// Generate additional mock products to reach 55 total products
const mockCategories = ['Electronics', 'Accessories', 'Furniture', 'Software', 'Networking'];
const mockAdjectives = ['Pro', 'Basic', 'Ultra', 'Premium', 'Compact', 'Ergonomic', 'Smart', 'Wireless', 'Mechanical', 'Portable'];
const mockNouns = ['Monitor', 'Keyboard', 'Mouse', 'Desk', 'Chair', 'Webcam', 'Microphone', 'Headphones', 'Router', 'Switch', 'Tablet', 'Laptop Stand'];

for (let i = 18; i <= 55; i++) {
    const randomCat = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    const randomName = mockAdjectives[Math.floor(Math.random() * mockAdjectives.length)] + ' ' + mockNouns[Math.floor(Math.random() * mockNouns.length)];
    const randomPrice = Math.floor(Math.random() * 800) + 15;
    const randomQty = Math.floor(Math.random() * 150);
    
    initialProducts.push({
        id: 'prod_' + Date.now() + '_' + i,
        name: randomName,
        price: randomPrice,
        quantity: randomQty,
        category: randomCat,
        sku: 'GEN-' + i.toString().padStart(3, '0'),
        status: randomQty === 0 ? 'Out of Stock' : (randomQty < 10 ? 'Low Stock' : 'In Stock'),
        createdAt: new Date().toLocaleString('en-US')
    });
}

// Main inventory array
export let inventory = [];

/**
 * Initializes the inventory from storage or uses default data
 * @param {Array|null} savedData - Data loaded from storage
 */
export const initializeInventory = (savedData) => {
    if (savedData && savedData.length > 0) {
        inventory = savedData;
    } else {
        // Use spread operator to create a fresh copy
        inventory = [...initialProducts];
    }
    return inventory;
};

/**
 * Validates product input data using conditional logic (if...else)
 * @param {Object} data - The raw input data
 * @returns {Object} Result with isValid boolean and error messages
 */
export const validateProduct = (data) => {
    const errors = {};
    let isValid = true;

    // Check name
    if (!data.name || data.name.trim() === '') {
        errors.name = 'Product name is required';
        isValid = false;
    }

    // Explicitly convert and check price
    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
        errors.price = 'Price must be a valid positive number';
        isValid = false;
    }

    // Explicitly convert and check quantity
    const quantity = Number(data.quantity);
    if (isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
        errors.quantity = 'Quantity must be a valid non-negative integer';
        isValid = false;
    }

    // Check category
    if (!data.category || data.category.trim() === '') {
        errors.category = 'Category is required';
        isValid = false;
    }

    return { isValid, errors };
};

/**
 * Classifies a product's price into a tier using if...else statements
 * @param {Number} price - The product price
 * @returns {String} The price category
 */
export const classifyProductPrice = (price) => {
    const numPrice = Number(price);
    
    if (numPrice < 50) {
        return 'Budget';
    } else if (numPrice >= 50 && numPrice < 200) {
        return 'Standard';
    } else {
        return 'Premium';
    }
};

/**
 * Determines stock status based on quantity
 * @param {Number} quantity - The available stock
 * @returns {String} Stock status message
 */
export const getStockStatus = (quantity) => {
    // Using ternary operator for simple status
    return quantity === 0 ? 'Out of Stock' : (quantity < 10 ? 'Low Stock' : 'In Stock');
};

/**
 * Generates a unique ID
 */
const generateId = () => {
    return 'prod_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

/**
 * Generates a SKU based on the product name
 * @param {String} name - Product name
 */
const generateSKU = (name) => {
    const prefix = name.substring(0, 3).toUpperCase().padEnd(3, 'X');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${randomNum}`;
};

/**
 * Adds a new product to the inventory
 * @param {Object} productData - Validated product data
 */
export const addProduct = (productData) => {
    const newProduct = {
        id: generateId(),
        name: productData.name.trim(),
        price: Number(productData.price),
        quantity: Number(productData.quantity),
        category: productData.category,
        sku: generateSKU(productData.name),
        status: getStockStatus(Number(productData.quantity)),
        createdAt: new Date().toLocaleString('en-US')
    };

    inventory.push(newProduct);
    return newProduct;
};

/**
 * Updates an existing product
 * @param {String} id - Product ID to update
 * @param {Object} productData - New validated data
 */
export const updateProduct = (id, productData) => {
    const index = inventory.findIndex(p => p.id === id);
    if (index !== -1) {
        inventory[index] = {
            ...inventory[index],
            name: productData.name.trim(),
            price: Number(productData.price),
            quantity: Number(productData.quantity),
            category: productData.category,
            status: getStockStatus(Number(productData.quantity))
            // Note: SKU, ID, and createdAt remain unchanged
        };
        return inventory[index];
    }
    return null;
};

/**
 * Deletes a product from the inventory
 * @param {String} id - Product ID to delete
 */
export const deleteProduct = (id) => {
    const initialLength = inventory.length;
    // Using filter() array method
    inventory = inventory.filter(product => product.id !== id);
    return inventory.length < initialLength;
};

/**
 * Finds a specific product by ID
 * @param {String} id - Product ID
 * @returns {Object|undefined} The product object if found
 */
export const findProductById = (id) => {
    // Using find() array method
    return inventory.find(product => product.id === id);
};

/**
 * Resets inventory to initial state
 */
export const resetInventory = () => {
    inventory = [...initialProducts];
    return inventory;
};

/**
 * Retrieves the current inventory
 */
export const getInventory = () => {
    return inventory;
};
