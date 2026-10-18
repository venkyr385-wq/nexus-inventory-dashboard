// concepts-lab.js
// Dedicated module to demonstrate JavaScript concepts

const concepts = [
    {
        id: 'vars-types',
        name: '1. Variables & Data Types',
        desc: 'Demonstrates let, const, var and different primitive/object data types.',
        code: `// Using const for values that don't change
const appName = "NEXUS Dashboard";

// Using let for values that might change
let version = 1.0;
let isRunning = true; // Boolean

// Different Data Types (using typeof)
console.log("appName type:", typeof appName); // String
console.log("version type:", typeof version); // Number
console.log("isRunning type:", typeof isRunning); // Boolean

// Array and Object types
const fruits = ["Apple", "Banana"]; 
const user = { name: "Admin", role: "Manager" };

console.log("fruits type:", typeof fruits); // Object (Arrays are objects)
console.log("user type:", typeof user); // Object

// Template literal
console.log(\`App \${appName} v\${version} is running: \${isRunning}\`);`,
        run: () => {
            const output = [];
            const appName = "NEXUS Dashboard";
            let version = 1.0;
            let isRunning = true;
            
            output.push(`appName type: ${typeof appName}`);
            output.push(`version type: ${typeof version}`);
            output.push(`isRunning type: ${typeof isRunning}`);
            
            const fruits = ["Apple", "Banana"]; 
            const user = { name: "Admin", role: "Manager" };
            
            output.push(`fruits type: ${typeof fruits}`);
            output.push(`user type: ${typeof user}`);
            output.push(`App ${appName} v${version} is running: ${isRunning}`);
            
            return output.join('\n');
        }
    },
    {
        id: 'operators',
        name: '2. Operators',
        desc: 'Arithmetic, comparison, logical, and assignment operators.',
        code: `let price = 100;
let quantity = 5;

// Arithmetic
let subtotal = price * quantity;
console.log("Subtotal (price * qty):", subtotal);

// Assignment
subtotal += 10; // Add ₹10 shipping
console.log("Total with shipping (+= 10):", subtotal);

// Comparison (Strict equality ===)
console.log("Is subtotal exactly 510?", subtotal === 510);
console.log("Is subtotal > 500?", subtotal > 500);

// Logical (&&, ||, !)
let hasDiscount = true;
if (subtotal > 500 && hasDiscount) {
    console.log("Eligible for special offer! (&& condition met)");
}`,
        run: () => {
            const output = [];
            let price = 100;
            let quantity = 5;
            let subtotal = price * quantity;
            output.push(`Subtotal (price * qty): ${subtotal}`);
            
            subtotal += 10;
            output.push(`Total with shipping (+= 10): ${subtotal}`);
            output.push(`Is subtotal exactly 510? ${subtotal === 510}`);
            output.push(`Is subtotal > 500? ${subtotal > 500}`);
            
            let hasDiscount = true;
            if (subtotal > 500 && hasDiscount) {
                output.push("Eligible for special offer! (&& condition met)");
            }
            return output.join('\n');
        }
    },
    {
        id: 'conditionals',
        name: '3. if...else & switch',
        desc: 'Controlling flow using conditional logic.',
        code: `let stockCount = 5;
let category = "Electronics";

// if...else if...else
if (stockCount === 0) {
    console.log("Status: OUT OF STOCK");
} else if (stockCount < 10) {
    console.log("Status: LOW STOCK WARNING");
} else {
    console.log("Status: IN STOCK");
}

// switch statement
switch (category) {
    case "Electronics":
        console.log("Category tax rate is 15%");
        break;
    case "Accessories":
        console.log("Category tax rate is 5%");
        break;
    default:
        console.log("Category tax rate is 10%");
}

// Ternary operator
let msg = (stockCount > 0) ? "Can sell item" : "Cannot sell item";
console.log("Ternary output:", msg);`,
        run: () => {
            const output = [];
            let stockCount = 5;
            let category = "Electronics";
            
            if (stockCount === 0) {
                output.push("Status: OUT OF STOCK");
            } else if (stockCount < 10) {
                output.push("Status: LOW STOCK WARNING");
            } else {
                output.push("Status: IN STOCK");
            }
            
            switch (category) {
                case "Electronics":
                    output.push("Category tax rate is 15%");
                    break;
                case "Accessories":
                    output.push("Category tax rate is 5%");
                    break;
                default:
                    output.push("Category tax rate is 10%");
            }
            
            let msg = (stockCount > 0) ? "Can sell item" : "Cannot sell item";
            output.push(`Ternary output: ${msg}`);
            
            return output.join('\n');
        }
    },
    {
        id: 'loops',
        name: '4. for, while & do...while',
        desc: 'Different ways to loop through code.',
        code: `console.log("--- FOR LOOP ---");
for (let i = 1; i <= 3; i++) {
    console.log("Processing item", i);
}

console.log("\\n--- WHILE LOOP ---");
let count = 3;
while (count > 0) {
    console.log("Countdown:", count);
    count--;
}

console.log("\\n--- DO...WHILE LOOP ---");
let attempts = 1;
do {
    console.log("Attempt number:", attempts);
    attempts++;
} while (attempts <= 2); // Runs at least once`,
        run: () => {
            const output = [];
            output.push("--- FOR LOOP ---");
            for (let i = 1; i <= 3; i++) {
                output.push("Processing item " + i);
            }
            
            output.push("\n--- WHILE LOOP ---");
            let count = 3;
            while (count > 0) {
                output.push("Countdown: " + count);
                count--;
            }
            
            output.push("\n--- DO...WHILE LOOP ---");
            let attempts = 1;
            do {
                output.push("Attempt number: " + attempts);
                attempts++;
            } while (attempts <= 2);
            
            return output.join('\n');
        }
    },
    {
        id: 'break-continue',
        name: '5. Break and Continue',
        desc: 'Controlling loop execution.',
        code: `const items = [10, 20, "INVALID", 40, 50];

console.log("Processing items, skipping invalid data:");
for (let i = 0; i < items.length; i++) {
    // continue skips the rest of the loop iteration
    if (typeof items[i] !== "number") {
        console.log(\`Skipping index \${i} (not a number)\`);
        continue;
    }
    
    console.log("Valid item:", items[i]);
    
    // break exits the loop entirely
    if (items[i] === 40) {
        console.log("Target found (40), stopping search.");
        break; 
    }
}`,
        run: () => {
            const output = [];
            const items = [10, 20, "INVALID", 40, 50];
            output.push("Processing items, skipping invalid data:");
            for (let i = 0; i < items.length; i++) {
                if (typeof items[i] !== "number") {
                    output.push(`Skipping index ${i} (not a number)`);
                    continue;
                }
                output.push("Valid item: " + items[i]);
                if (items[i] === 40) {
                    output.push("Target found (40), stopping search.");
                    break;
                }
            }
            return output.join('\n');
        }
    },
    {
        id: 'functions',
        name: '6. Functions & Arrow Functions',
        desc: 'Defining reusable code blocks.',
        code: `// 1. Regular Function Declaration
function calculateTax(amount, rate = 0.1) { // default param
    return amount * rate;
}

// 2. Function Expression
const calculateTotal = function(amount, tax) {
    return amount + tax;
};

// 3. Arrow Function (ES6)
const formatCurrency = (val) => '₹' + val.toFixed(2);

// Usage
let basePrice = 100;
let tax = calculateTax(basePrice);
let total = calculateTotal(basePrice, tax);

console.log("Tax:", formatCurrency(tax));
console.log("Total:", formatCurrency(total));`,
        run: () => {
            const output = [];
            function calculateTax(amount, rate = 0.1) {
                return amount * rate;
            }
            const calculateTotal = function(amount, tax) {
                return amount + tax;
            };
            const formatCurrency = (val) => '₹' + val.toFixed(2);
            
            let basePrice = 100;
            let tax = calculateTax(basePrice);
            let total = calculateTotal(basePrice, tax);
            
            output.push("Tax: " + formatCurrency(tax));
            output.push("Total: " + formatCurrency(total));
            return output.join('\n');
        }
    },
    {
        id: 'scope',
        name: '7. Function and Block Scope',
        desc: 'How variables are accessed (var vs let/const).',
        code: `let globalVar = "I am global"; // Global scope

function testScope() {
    let functionVar = "I am in function scope";
    
    if (true) {
        // Block scope
        let blockVar = "I am in block scope (let)";
        var functionVar2 = "I am function scoped (var)";
        
        console.log("Inside block:", globalVar);
        console.log("Inside block:", functionVar);
        console.log("Inside block:", blockVar);
    }
    
    // blockVar is NOT accessible here! (Throws ReferenceError)
    // console.log(blockVar); 
    
    // var is NOT block scoped, so it IS accessible here!
    console.log("Outside block (var):", functionVar2);
}

testScope();`,
        run: () => {
            const output = [];
            let globalVar = "I am global";
            
            function testScope() {
                let functionVar = "I am in function scope";
                if (true) {
                    let blockVar = "I am in block scope (let)";
                    var functionVar2 = "I am function scoped (var)";
                    output.push("Inside block: " + globalVar);
                    output.push("Inside block: " + functionVar);
                    output.push("Inside block: " + blockVar);
                }
                output.push("Outside block (var): " + functionVar2);
            }
            testScope();
            return output.join('\n');
        }
    },
    {
        id: 'arrays-methods',
        name: '8. forEach, map, filter, reduce',
        desc: 'Advanced array iteration methods.',
        code: `const products = [
    { name: "Laptop", price: 800, qty: 2 },
    { name: "Mouse", price: 25, qty: 5 },
    { name: "Keyboard", price: 50, qty: 0 }
];

console.log("--- forEach (Iterate) ---");
products.forEach(p => console.log(p.name));

console.log("\\n--- filter (Create subset) ---");
const inStock = products.filter(p => p.qty > 0);
console.log("In Stock Items:", inStock.length);

console.log("\\n--- map (Transform array) ---");
const prices = products.map(p => p.price);
console.log("Just Prices:", prices);

console.log("\\n--- reduce (Accumulate value) ---");
const totalValue = products.reduce((acc, p) => acc + (p.price * p.qty), 0);
console.log("Total Inventory Value: ₹" + totalValue);`,
        run: () => {
            const output = [];
            const products = [
                { name: "Laptop", price: 800, qty: 2 },
                { name: "Mouse", price: 25, qty: 5 },
                { name: "Keyboard", price: 50, qty: 0 }
            ];
            
            output.push("--- forEach (Iterate) ---");
            products.forEach(p => output.push(p.name));
            
            output.push("\n--- filter (Create subset) ---");
            const inStock = products.filter(p => p.qty > 0);
            output.push("In Stock Items: " + inStock.length);
            
            output.push("\n--- map (Transform array) ---");
            const prices = products.map(p => p.price);
            output.push("Just Prices: [" + prices.join(", ") + "]");
            
            output.push("\n--- reduce (Accumulate value) ---");
            const totalValue = products.reduce((acc, p) => acc + (p.price * p.qty), 0);
            output.push("Total Inventory Value: ₹" + totalValue);
            
            return output.join('\n');
        }
    }
];

let selectedConcept = concepts[0];

export const initConceptsLab = () => {
    const menuEl = document.getElementById('concept-menu');
    if (!menuEl) return;

    menuEl.innerHTML = '';
    
    concepts.forEach(concept => {
        const li = document.createElement('li');
        li.textContent = concept.name;
        li.dataset.id = concept.id;
        
        if (concept.id === selectedConcept.id) {
            li.classList.add('active');
        }
        
        li.addEventListener('click', () => {
            // Update active class
            document.querySelectorAll('#concept-menu li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            
            // Render concept
            const targetConcept = concepts.find(c => c.id === concept.id);
            if (targetConcept) {
                renderConcept(targetConcept);
            }
        });
        
        menuEl.appendChild(li);
    });

    // Run button
    const btnRun = document.getElementById('btn-run-concept');
    btnRun.addEventListener('click', () => {
        const consoleEl = document.getElementById('concept-console');
        const consoleContainer = document.getElementById('concept-console-container');
        
        consoleContainer.classList.remove('d-none');
        consoleEl.textContent = "Running...\n";
        
        try {
            // NEVER use eval() as per instructions. 
            // We run a predefined safe function assigned to the concept.
            const result = selectedConcept.run();
            consoleEl.textContent = result;
        } catch (e) {
            consoleEl.textContent = "Error: " + e.message;
        }
    });

    // Render initial concept
    renderConcept(selectedConcept);
};

const renderConcept = (concept) => {
    selectedConcept = concept;
    document.getElementById('concept-title').textContent = concept.name;
    document.getElementById('concept-desc').textContent = concept.desc;
    
    const codeContainer = document.getElementById('concept-code-container');
    const consoleContainer = document.getElementById('concept-console-container');
    
    codeContainer.classList.remove('d-none');
    consoleContainer.classList.add('d-none'); // hide console initially
    
    document.getElementById('concept-code').textContent = concept.code;
};
