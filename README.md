# NEXUS - Product Inventory & Analytics Dashboard

## 1. Project Overview
NEXUS is a complete, modern, responsive web application built for managing product inventory and providing real-time financial analytics. It serves as a comprehensive demonstration of core JavaScript concepts (ES6+), designed without using complex frameworks like React or Angular. 

The dashboard features a premium SaaS-style interface inspired by modern tools like Linear and Vercel, utilizing glassmorphism, responsive design, dark/light modes, and interactive data visualizations.

## 2. Feature List
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for inventory items.
- **Financial Analytics:** Real-time calculation of total inventory value, average prices, and stock statuses.
- **Dynamic Categorization:** Automatic classification of products into Budget, Standard, and Premium tiers.
- **Interactive Charts:** Real-time data visualization using Chart.js (Inventory Value, Price Distribution, Stock Distribution).
- **Tax & Discount Calculator:** Built-in tool for calculating final amounts with customizable rates.
- **Advanced Filtering & Sorting:** Instant search, categorical filtering, and multi-parameter sorting.
- **Persistent Storage:** Data is saved to `localStorage` across browser sessions.
- **CSV Export:** Downloadable inventory reports.
- **JS Concepts Lab:** A dedicated interactive module demonstrating JavaScript fundamentals (variables, loops, arrays, scoping, etc.).
- **Premium UI/UX:** Glass-style cards, smooth transitions, toast notifications, responsive mobile design, and theme toggling.

## 3. Technologies Used
- **HTML5:** Semantic structure and accessible layouts.
- **CSS3 (Vanilla):** Custom CSS variables, Flexbox/Grid layouts, animations, glassmorphism, and responsive media queries. No preprocessors (SASS) or frameworks (Tailwind/Bootstrap) were used.
- **JavaScript (Vanilla ES6+):** Complete application logic, array methods, DOM manipulation, local storage integration.
- **Chart.js:** Library for rendering canvas-based analytics charts (via CDN).
- **Lucide Icons:** Open-source SVG icons for a consistent visual language (via CDN).

## 4. Folder Structure
```
nexus-inventory-dashboard/
├── index.html            # Main application layout and UI structure
├── css/
│   └── style.css         # Complete design system, theming, and animations
├── js/
│   ├── app.js            # Main entry point, DOM events, and initialization
│   ├── inventory.js      # Product CRUD, validation, and data modeling
│   ├── analytics.js      # Calculations, statistics, and Chart.js integration
│   ├── storage.js        # localStorage and CSV export utilities
│   └── concepts-lab.js   # Interactive demonstrations of core JS concepts
└── README.md             # Project documentation (this file)
```

## 5. How to Run the Project
This project uses ES6 Modules (`type="module"`), which requires it to be run via a local web server to avoid CORS issues.

**Using VS Code:**
1. Open the `nexus-inventory-dashboard` folder in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The application will automatically open in your default browser at `http://127.0.0.1:5500/index.html`.

## 6. JavaScript Concepts Demonstrated (Concepts Lab)
You can navigate to the **"JS Concepts Lab"** tab within the dashboard to see interactive examples of:
1. **Variables & Data Types:** `let`, `const`, primitive types, and objects.
2. **Operators:** Arithmetic, assignment, comparison, and logical operators.
3. **Conditionals:** `if...else`, `switch`, and ternary operators.
4. **Loops:** `for`, `while`, and `do...while` iterations.
5. **Break/Continue:** Loop control structures.
6. **Functions:** Regular declarations, expressions, and arrow functions.
7. **Scope:** Block scope (`let`/`const`) vs. function scope (`var`).
8. **Array Methods:** Iteration and transformation using `forEach()`, `map()`, `filter()`, and `reduce()`.

## 7. Demonstration Guide
- **Add Product:** Click "New Product" on the dashboard or use the "Quick Add" (lightning bolt) icon in the top right to test `prompt()` input handling.
- **View Updates:** Watch the top KPI cards and charts update instantly as you add or modify inventory.
- **Search & Filter:** Navigate to the "Inventory" tab, type in the search bar, or use the dropdowns to test real-time array filtering.
- **Delete:** Use the trash icon in the inventory table to trigger a deletion confirmation modal.
- **Reset Data:** Use the "Reset Data" option in the bottom left sidebar to clear local storage and restore default items.
- **Console Log:** Open your browser's Developer Tools (F12) -> Console upon loading the page to see the initial assignment output report.

## 8. Testing Checklist
- [x] Application loads without console errors.
- [x] Initial console output clearly demonstrates data processing and reporting.
- [x] Adding a product immediately updates statistics, table, and charts.
- [x] Editing a product updates only the specific product in the array.
- [x] Negative or invalid inputs are caught and rejected.
- [x] Price categorization automatically assigns the correct badges (Budget, Standard, Premium).
- [x] Searching correctly filters the visible table.
- [x] Refreshing the page persists data and the selected Dark/Light theme via `localStorage`.
- [x] CSV Export properly generates a downloadable file.
- [x] Layout is responsive on mobile screens.

## 9. Known Limitations
- Quick Add via `prompt()` does not support complex categorical selections.
- CSV import is structurally omitted in this version in favor of strict Export/localStorage functionalities to maintain pure client-side constraints.
- No backend database; clearing the browser's `localStorage` will erase customized data if not exported.
