// Node.js test runner for TransactionManager
// This file loads the TransactionManager class and runs tests

// Read and evaluate the app.js file to get the TransactionManager class
const fs = require("fs");
const vm = require("vm");
const appCode = fs.readFileSync("js/app.js", "utf8");

// Create a context and run the code
const context = {};
vm.createContext(context);
vm.runInContext(appCode, context);

// Get the TransactionManager class from the context
const TransactionManager = context.TransactionManager;

// Now run the tests
console.log("Testing TransactionManager...\n");

// Test 1: Constructor initializes empty array
const manager = new TransactionManager();
if (manager.transactions.length !== 0)
  throw new Error("Constructor should initialize empty array");
console.log("✓ Test 1 passed: Constructor initializes empty array");

// Test 2: addTransaction creates transaction with correct properties
const transaction1 = manager.addTransaction("Lunch", 12.5, "Food");
if (transaction1.itemName !== "Lunch")
  throw new Error("Item name should be 'Lunch'");
if (transaction1.amount !== 12.5) throw new Error("Amount should be 12.50");
if (transaction1.category !== "Food")
  throw new Error("Category should be 'Food'");
if (!transaction1.id) throw new Error("ID should be generated");
if (!transaction1.timestamp) throw new Error("Timestamp should be generated");
console.log(
  "✓ Test 2 passed: addTransaction creates transaction with correct properties",
);

// Test 3: getAllTransactions returns all transactions
const transaction2 = manager.addTransaction("Bus Ticket", 2.75, "Transport");
const allTransactions = manager.getAllTransactions();
if (allTransactions.length !== 2) throw new Error("Should have 2 transactions");
console.log("✓ Test 3 passed: getAllTransactions returns all transactions");

// Test 4: getTransactionById finds correct transaction
const found = manager.getTransactionById(transaction1.id);
if (found !== transaction1)
  throw new Error("Should find the correct transaction");
console.log("✓ Test 4 passed: getTransactionById finds correct transaction");

// Test 5: calculateTotal sums all amounts
const total = manager.calculateTotal();
if (Math.abs(total - 15.25) > 0.001)
  throw new Error(`Total should be 15.25, got ${total}`);
console.log("✓ Test 5 passed: calculateTotal sums all amounts");

// Test 6: getCategoryTotals returns correct totals per category
manager.addTransaction("Movie", 15.0, "Fun");
const categoryTotals = manager.getCategoryTotals();
if (Math.abs(categoryTotals.Food - 12.5) > 0.001)
  throw new Error(`Food total should be 12.50, got ${categoryTotals.Food}`);
if (Math.abs(categoryTotals.Transport - 2.75) > 0.001)
  throw new Error(
    `Transport total should be 2.75, got ${categoryTotals.Transport}`,
  );
if (Math.abs(categoryTotals.Fun - 15.0) > 0.001)
  throw new Error(`Fun total should be 15.00, got ${categoryTotals.Fun}`);
console.log(
  "✓ Test 6 passed: getCategoryTotals returns correct totals per category",
);

// Test 7: deleteTransaction removes transaction
const deleted = manager.deleteTransaction(transaction1.id);
if (deleted !== true)
  throw new Error("Should return true when deleting existing transaction");
if (manager.getAllTransactions().length !== 2)
  throw new Error("Should have 2 transactions after deletion");
if (manager.getTransactionById(transaction1.id) !== undefined)
  throw new Error("Deleted transaction should not be found");
console.log("✓ Test 7 passed: deleteTransaction removes transaction");

// Test 8: deleteTransaction returns false for non-existent ID
const notDeleted = manager.deleteTransaction("non-existent-id");
if (notDeleted !== false)
  throw new Error("Should return false when deleting non-existent transaction");
console.log(
  "✓ Test 8 passed: deleteTransaction returns false for non-existent ID",
);

// Test 9: calculateTotal returns 0 for empty list
const emptyManager = new TransactionManager();
if (emptyManager.calculateTotal() !== 0)
  throw new Error("Empty list should have total of 0");
console.log("✓ Test 9 passed: calculateTotal returns 0 for empty list");

// Test 10: ID generation is unique
const ids = new Set();
for (let i = 0; i < 100; i++) {
  const t = manager.addTransaction("Test", 1.0, "Food");
  ids.add(t.id);
}
if (ids.size !== 100) throw new Error("All generated IDs should be unique");
console.log("✓ Test 10 passed: ID generation is unique");

console.log("\n✅ All TransactionManager tests passed!");
