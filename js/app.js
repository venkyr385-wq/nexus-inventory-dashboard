// app.js
// Main application entry point handling DOM manipulation and events

import { 
    inventory, 
    initializeInventory, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    findProductById, 
    classifyProductPrice, 
    resetInventory, 
    getStockStatus
} from './inventory.js';
import { 
    loadInventory, 
    saveInventory, 
    exportInventoryCSV,
    clearStorage
} from './storage.js';
import { 
    calculateTotalProducts, 
    calculateInventoryValue, 
    calculateAveragePrice, 
    getLowStockCount, 
    getAffordableProducts, 
    getFormattedReport, 
    calculateFinalPrice, 
    updateCharts 
} from './analytics.js';
import { initConceptsLab } from './concepts-lab.js';

// Application State
let currentView = 'dashboard-view';
let currentTheme = localStorage.getItem('nexus_theme') || 'dark';

// Pagination state
let currentPage = 1;
const ITEMS_PER_PAGE = 10;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Load data from localStorage or use defaults
    const savedData = loadInventory();
    initializeInventory(savedData);
    
    // Log required console output (Assignment requirement)
    logConsoleDemonstration();
    
    // Initialize UI
    initNavigation();
    initModals();
    initForms();
    initFilters();
    initConceptsLab();
    
    // Render Initial State
    updateDashboard();
    
    // Init Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Init Live Clock
    initClock();
});

// ==========================================
// Live Clock
// ==========================================
const initClock = () => {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    
    const updateTime = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    };
    
    updateTime();
    setInterval(updateTime, 1000);
};

// ==========================================
// Console Demonstration (Requirement 13)
// ==========================================
const logConsoleDemonstration = () => {
    console.log("--- Initializing Inventory System ---");
    console.log("Initial products loaded successfully.\n\n");
    
    console.log("--- Processing Inventory Roster (forEach) ---");
    inventory.forEach(item => {
        const category = classifyProductPrice(item.price);
        console.log(`Item: ${item.name} (₹${item.price}) -> Category: ${category}`);
    });
    
    console.log("\n--- Financial Analytics ---");
    const totalProds = calculateTotalProducts(inventory);
    const totalValue = calculateInventoryValue(inventory);
    const avgPrice = calculateAveragePrice(inventory);
    const affordable = getAffordableProducts(inventory).map(p => p.name);
    const report = getFormattedReport(inventory);
    
    console.log(`Total Products: ${totalProds}`);
    console.log(`Total Inventory Value: ₹${totalValue.toLocaleString()}`);
    console.log(`Average Unit Price: ₹${avgPrice.toFixed(0)}`);
    console.log(`Affordable Products (Under ₹200): ${JSON.stringify(affordable)}`);
    console.log(`Formatted Report List: ${JSON.stringify(report)}`);
};

// ==========================================
// UI Updates & Rendering
// ==========================================
const updateDashboard = () => {
    // Update KPI Cards
    const valTotalProds = document.getElementById('stat-total-products');
    const valTotalValue = document.getElementById('stat-total-value');
    const valAvgPrice = document.getElementById('stat-avg-price');
    const valLowStock = document.getElementById('stat-low-stock');
    
    if (valTotalProds) valTotalProds.textContent = calculateTotalProducts(inventory);
    if (valTotalValue) valTotalValue.textContent = `₹${calculateInventoryValue(inventory).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    if (valAvgPrice) valAvgPrice.textContent = `₹${calculateAveragePrice(inventory).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    
    const lowStockCount = getLowStockCount(inventory);
    if (valLowStock) valLowStock.textContent = lowStockCount;
    
    const alertBadge = document.getElementById('alert-badge');
    if (alertBadge) {
        alertBadge.textContent = lowStockCount;
        if (lowStockCount > 0) alertBadge.classList.remove('d-none');
        else alertBadge.classList.add('d-none');
    }

    // Update Calculator Base Amount
    const calcBase = document.getElementById('calc-base-amount');
    if (calcBase) calcBase.value = calculateInventoryValue(inventory);
    updateCalculator();

    // Render Recent Table (Dashboard)
    renderRecentInventory();
    
    // Render Full Table (Inventory View)
    renderFullInventory();
    
    // Update Charts
    updateCharts(inventory);
    
    // Save to storage
    saveInventory(inventory);
    
    // Re-initialize icons for newly added DOM elements
    if (window.lucide) window.lucide.createIcons();
};

const getBadgeHtml = (tier) => {
    switch (tier) {
        case 'Budget': return `<span class="badge badge-outline text-success">Budget</span>`;
        case 'Standard': return `<span class="badge badge-outline text-cyan">Standard</span>`;
        case 'Premium': return `<span class="badge badge-outline text-violet">Premium</span>`;
        default: return `<span class="badge badge-outline text-secondary">${tier}</span>`;
    }
};

const getStatusBadgeHtml = (status) => {
    if (status === 'Out of Stock') return `<span class="badge bg-danger-light text-danger">${status}</span>`;
    if (status === 'Low Stock') return `<span class="badge bg-warning-light text-warning">${status}</span>`;
    return `<span class="badge bg-success-light text-success">${status}</span>`;
};

const renderRecentInventory = () => {
    const tbody = document.getElementById('recent-inventory-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Get newest 5 items
    const recentItems = [...inventory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    
    if (recentItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No products found.</td></tr>';
        return;
    }

    recentItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="product-cell btn-view-trigger" data-id="${item.id}" style="cursor: pointer;">
                    <div class="product-icon"><i data-lucide="box"></i></div>
                    <div class="product-info">
                        <h4>${item.name}</h4>
                    </div>
                </div>
            </td>
            <td class="text-secondary">${item.sku}</td>
            <td><span class="badge bg-violet-light text-violet">${item.category}</span></td>
            <td class="font-weight-bold">₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${getStatusBadgeHtml(item.status)}</td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('#recent-inventory-tbody .btn-view-trigger').forEach(el => {
        el.addEventListener('click', (e) => openViewModal(e.currentTarget.dataset.id));
    });
};

const renderFullInventory = () => {
    const tbody = document.getElementById('full-inventory-tbody');
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.querySelector('.inventory-table-wrapper table');
    if (!tbody) return;

    // Apply Filters & Search
    let filtered = filterAndSortInventory();

    if (filtered.length === 0) {
        tableWrapper.classList.add('d-none');
        emptyState.classList.remove('d-none');
    } else {
        tableWrapper.classList.remove('d-none');
        emptyState.classList.add('d-none');
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages || 1}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    tbody.innerHTML = '';
    paginatedItems.forEach(item => {
        const priceTier = classifyProductPrice(item.price);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="product-cell" style="cursor: pointer;" onclick="document.querySelector('.btn-view[data-id=\\'${item.id}\\']').click()">
                    <div class="product-icon"><i data-lucide="package"></i></div>
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <p>${item.sku} | ${item.category}</p>
                    </div>
                </div>
            </td>
            <td>${getBadgeHtml(priceTier)}</td>
            <td class="font-weight-bold">₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${getStatusBadgeHtml(item.status)}</td>
            <td>
                <div class="action-btns">
                    <button class="btn btn-icon btn-outline btn-view" data-id="${item.id}" title="View"><i data-lucide="eye"></i></button>
                    <button class="btn btn-icon btn-outline btn-edit" data-id="${item.id}" title="Edit"><i data-lucide="edit-2"></i></button>
                    <button class="btn btn-icon btn-outline btn-delete text-danger" data-id="${item.id}" title="Delete"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Attach event listeners to newly created buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => openViewModal(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => openProductModal(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => openDeleteModal(e.currentTarget.dataset.id));
    });
    
    updateAnalyticsReports();
};

const updateAnalyticsReports = () => {
    const affordableList = document.getElementById('affordable-products-list');
    const reportList = document.getElementById('formatted-report-list');
    
    if (affordableList) {
        affordableList.innerHTML = '';
        getAffordableProducts(inventory).forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} - ₹${p.price.toFixed(2)}`;
            affordableList.appendChild(li);
        });
    }
    
    if (reportList) {
        reportList.innerHTML = '';
        getFormattedReport(inventory).forEach(str => {
            const li = document.createElement('li');
            li.textContent = str;
            reportList.appendChild(li);
        });
    }
};

// ==========================================
// Sorting & Filtering
// ==========================================
const filterAndSortInventory = () => {
    const searchVal = document.getElementById('global-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('filter-category')?.value || 'all';
    const priceFilter = document.getElementById('filter-price-tier')?.value || 'all';
    const stockFilter = document.getElementById('filter-stock')?.value || 'all';
    const sortVal = document.getElementById('sort-inventory')?.value || 'newest';

    // Filter
    let result = inventory.filter(item => {
        // Search
        const matchesSearch = item.name.toLowerCase().includes(searchVal) || 
                              item.sku.toLowerCase().includes(searchVal) ||
                              item.category.toLowerCase().includes(searchVal);
        if (!matchesSearch) return false;

        // Category
        if (categoryFilter !== 'all' && item.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
        
        // Price Tier
        if (priceFilter !== 'all') {
            const tier = classifyProductPrice(item.price).toLowerCase();
            if (tier !== priceFilter) return false;
        }
        
        // Stock
        if (stockFilter !== 'all') {
            const status = item.status.toLowerCase().replace(/\s+/g, '-');
            if (status !== stockFilter) return false;
        }

        return true;
    });

    // Sort
    result.sort((a, b) => {
        switch (sortVal) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'stock-asc': return a.quantity - b.quantity;
            case 'newest':
            default: return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return result;
};

const initFilters = () => {
    const elements = ['global-search', 'filter-category', 'filter-price-tier', 'filter-stock', 'sort-inventory'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => {
            currentPage = 1;
            renderFullInventory();
            if (window.lucide) window.lucide.createIcons();
        });
    });

    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
        document.getElementById('global-search').value = '';
        document.getElementById('filter-category').value = 'all';
        document.getElementById('filter-price-tier').value = 'all';
        document.getElementById('filter-stock').value = 'all';
        document.getElementById('sort-inventory').value = 'newest';
        renderFullInventory();
        if (window.lucide) window.lucide.createIcons();
    });

    document.getElementById('prev-page')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderFullInventory();
            if (window.lucide) window.lucide.createIcons();
        }
    });
    
    document.getElementById('next-page')?.addEventListener('click', () => {
        currentPage++;
        renderFullInventory();
        if (window.lucide) window.lucide.createIcons();
    });
};


// ==========================================
// Calculator
// ==========================================
const updateCalculator = () => {
    const baseAmountInput = document.getElementById('calc-base-amount');
    const taxInput = document.getElementById('calc-tax');
    const discountInput = document.getElementById('calc-discount');
    
    if (!baseAmountInput || !taxInput || !discountInput) return;

    const baseAmount = Number(baseAmountInput.value) || 0;
    const taxPercent = Number(taxInput.value) || 0;
    const discountPercent = Number(discountInput.value) || 0;

    const results = calculateFinalPrice(baseAmount, taxPercent, discountPercent);
    
    document.getElementById('res-subtotal').textContent = `₹${results.subtotal.toFixed(2)}`;
    document.getElementById('res-discount').textContent = `-₹${results.discountAmount.toFixed(2)}`;
    document.getElementById('res-tax').textContent = `+₹${results.taxAmount.toFixed(2)}`;
    document.getElementById('res-final').textContent = `₹${results.finalAmount.toFixed(2)}`;
};

document.getElementById('btn-calculate')?.addEventListener('click', updateCalculator);


// ==========================================
// Navigation & Views
// ==========================================
const initNavigation = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view-section');

    const switchView = (viewId) => {
        views.forEach(v => v.classList.add('d-none'));
        navLinks.forEach(l => l.classList.remove('active'));
        
        document.getElementById(viewId)?.classList.remove('d-none');
        document.querySelector(`[data-view="${viewId}"]`)?.classList.add('active');
        
        currentView = viewId;
        if (viewId === 'analytics-view') {
            // Need to resize charts when view becomes visible
            updateCharts(inventory);
        }
        
        // Close mobile sidebar if open
        document.getElementById('sidebar')?.classList.remove('open');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(e.currentTarget.dataset.view);
        });
    });

    document.getElementById('view-all-inventory')?.addEventListener('click', () => {
        switchView('inventory-view');
    });

    // Mobile Menu Toggle
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('open');
    });
    document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
    });

    // Theme Toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('nexus_theme', currentTheme);
        // Force chart update for colors
        updateCharts(inventory);
    });
    
    // Notification Bell (Header Symbol)
    document.querySelector('.notification-btn')?.addEventListener('click', () => {
        switchView('inventory-view');
        const stockFilter = document.getElementById('filter-stock');
        if (stockFilter) {
            stockFilter.value = 'low'; // Automatically filter to show low stock
            renderFullInventory();
        }
        showToast("Showing Low Stock Alerts", "info");
    });

    // Profile Avatar (Header Symbol)
    document.querySelector('.profile')?.addEventListener('click', () => {
        showToast("Profile: Administrator (Session Active)", "info");
    });
    
    // Quick Add Workflow (prompt)
    document.getElementById('quick-add-btn')?.addEventListener('click', () => {
        const name = prompt("Enter Product Name:");
        if (!name || name.trim() === '') return;
        
        const priceStr = prompt("Enter Price:");
        const price = Number(priceStr);
        if (isNaN(price) || price <= 0) {
            showToast("Invalid price entered.", "error");
            return;
        }
        
        const quantityStr = prompt("Enter Quantity:");
        const quantity = Number(quantityStr);
        if (isNaN(quantity) || quantity < 0) {
            showToast("Invalid quantity entered.", "error");
            return;
        }
        
        const newProduct = addProduct({
            name: name,
            price: price,
            quantity: quantity,
            category: 'Uncategorized' // Default for quick add
        });
        
        updateDashboard();
        showToast(`Quick Add successful: ${newProduct.name}`, "success");
    });
    
    // Export Data
    document.getElementById('nav-export-csv')?.addEventListener('click', (e) => {
        e.preventDefault();
        exportInventoryCSV(inventory);
        showToast("Inventory exported to CSV.", "info");
    });
    
    // Reset Data
    document.getElementById('nav-reset-data')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('reset-modal').classList.remove('d-none');
    });
};


// ==========================================
// Forms and Modals
// ==========================================
const openProductModal = (id = null) => {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    
    // Reset form and errors
    form.reset();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    if (id) {
        // Edit Mode
        const product = findProductById(id);
        if (product) {
            title.textContent = 'Edit Product';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-quantity').value = product.quantity;
            document.getElementById('product-category').value = product.category;
        }
    } else {
        // Add Mode
        title.textContent = 'Add New Product';
        document.getElementById('product-id').value = '';
    }
    
    modal.classList.remove('d-none');
};

const openDeleteModal = (id) => {
    const product = findProductById(id);
    if (!product) return;
    
    document.getElementById('delete-product-id').value = id;
    document.getElementById('delete-product-name').textContent = product.name;
    document.getElementById('delete-modal').classList.remove('d-none');
};

const openViewModal = (id) => {
    const product = findProductById(id);
    if (!product) return;

    document.getElementById('view-product-name').textContent = product.name;
    document.getElementById('view-product-sku').textContent = product.sku;
    document.getElementById('view-product-category').innerHTML = `<span class="badge bg-violet-light text-violet">${product.category}</span>`;
    document.getElementById('view-product-status').innerHTML = getStatusBadgeHtml(product.status);
    document.getElementById('view-product-price').textContent = `₹${product.price.toFixed(2)}`;
    document.getElementById('view-product-qty').textContent = product.quantity;
    document.getElementById('view-product-value').textContent = `₹${(product.price * product.quantity).toFixed(2)}`;
    document.getElementById('view-product-date').textContent = product.createdAt;

    document.getElementById('view-modal').classList.remove('d-none');
};

const initModals = () => {
    // Add Buttons
    document.getElementById('nav-add-product')?.addEventListener('click', (e) => { e.preventDefault(); openProductModal(); });
    document.getElementById('dashboard-add-product')?.addEventListener('click', () => openProductModal());
    document.getElementById('inventory-add-product')?.addEventListener('click', () => openProductModal());

    // Close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('product-modal').classList.add('d-none');
        });
    });
    
    document.querySelectorAll('.close-delete-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('delete-modal').classList.add('d-none');
        });
    });
    
    document.querySelectorAll('.close-view-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('view-modal').classList.add('d-none');
        });
    });
    
    document.querySelectorAll('.close-reset-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('reset-modal').classList.add('d-none');
        });
    });
    
    // Escape key support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('d-none'));
        }
    });
    
    // Click outside to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('d-none');
            }
        });
    });
};

const initForms = () => {
    document.getElementById('btn-save-product')?.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        
        const id = document.getElementById('product-id').value;
        const rawData = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            quantity: document.getElementById('product-quantity').value,
            category: document.getElementById('product-category').value
        };
        
        // Basic validation implementation (if...else)
        let isValid = true;
        if (!rawData.name.trim()) { document.getElementById('err-name').textContent = "Required"; isValid = false; }
        if (Number(rawData.price) <= 0 || isNaN(Number(rawData.price))) { document.getElementById('err-price').textContent = "Invalid positive price"; isValid = false; }
        if (Number(rawData.quantity) < 0 || isNaN(Number(rawData.quantity)) || !Number.isInteger(Number(rawData.quantity))) { document.getElementById('err-quantity').textContent = "Invalid integer"; isValid = false; }
        if (!rawData.category) { document.getElementById('err-category').textContent = "Required"; isValid = false; }
        
        if (isValid) {
            if (id) {
                updateProduct(id, rawData);
                showToast("Product updated successfully.", "success");
            } else {
                addProduct(rawData);
                showToast("New product added.", "success");
            }
            document.getElementById('product-modal').classList.add('d-none');
            updateDashboard();
        }
    });

    document.getElementById('btn-confirm-delete')?.addEventListener('click', () => {
        const id = document.getElementById('delete-product-id').value;
        if (id) {
            deleteProduct(id);
            showToast("Product deleted.", "success");
            document.getElementById('delete-modal').classList.add('d-none');
            updateDashboard();
        }
    });
    
    document.getElementById('btn-confirm-reset')?.addEventListener('click', () => {
        clearStorage();
        resetInventory();
        document.getElementById('reset-modal').classList.add('d-none');
        updateDashboard();
        showToast("Inventory reset to sample data.", "info");
    });
};

// ==========================================
// Toast Notifications
// ==========================================
const showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-circle';
    
    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <div class="toast-content">${message}</div>
    `;
    
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
};

// Expose some logic for external use if needed
window.toggleTheme = () => document.getElementById('theme-toggle').click();
