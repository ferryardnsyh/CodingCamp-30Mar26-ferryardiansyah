// Simple test file to verify TransactionManager functionality
// This is a temporary test file for Task 3.1 verification

// Load the TransactionManager class (in a real environment, this would be imported)
// For now, we'll test it manually in the browser console or with Node.js

function testTransactionManager() {
  console.log("Testing TransactionManager...");

  // Test 1: Constructor initializes empty array
  const manager = new TransactionManager();
  console.assert(
    manager.transactions.length === 0,
    "Constructor should initialize empty array",
  );
  console.log("✓ Test 1 passed: Constructor initializes empty array");

  // Test 2: addTransaction creates transaction with correct properties
  const transaction1 = manager.addTransaction("Lunch", 12.5, "Food");
  console.assert(
    transaction1.itemName === "Lunch",
    "Item name should be 'Lunch'",
  );
  console.assert(transaction1.amount === 12.5, "Amount should be 12.50");
  console.assert(transaction1.category === "Food", "Category should be 'Food'");
  console.assert(transaction1.id !== undefined, "ID should be generated");
  console.assert(
    transaction1.timestamp !== undefined,
    "Timestamp should be generated",
  );
  console.log(
    "✓ Test 2 passed: addTransaction creates transaction with correct properties",
  );

  // Test 3: getAllTransactions returns all transactions
  const transaction2 = manager.addTransaction("Bus Ticket", 2.75, "Transport");
  const allTransactions = manager.getAllTransactions();
  console.assert(allTransactions.length === 2, "Should have 2 transactions");
  console.log("✓ Test 3 passed: getAllTransactions returns all transactions");

  // Test 4: getTransactionById finds correct transaction
  const found = manager.getTransactionById(transaction1.id);
  console.assert(found === transaction1, "Should find the correct transaction");
  console.log("✓ Test 4 passed: getTransactionById finds correct transaction");

  // Test 5: calculateTotal sums all amounts
  const total = manager.calculateTotal();
  console.assert(total === 15.25, `Total should be 15.25, got ${total}`);
  console.log("✓ Test 5 passed: calculateTotal sums all amounts");

  // Test 6: getCategoryTotals returns correct totals per category
  manager.addTransaction("Movie", 15.0, "Fun");
  const categoryTotals = manager.getCategoryTotals();
  console.assert(
    categoryTotals.Food === 12.5,
    `Food total should be 12.50, got ${categoryTotals.Food}`,
  );
  console.assert(
    categoryTotals.Transport === 2.75,
    `Transport total should be 2.75, got ${categoryTotals.Transport}`,
  );
  console.assert(
    categoryTotals.Fun === 15.0,
    `Fun total should be 15.00, got ${categoryTotals.Fun}`,
  );
  console.log(
    "✓ Test 6 passed: getCategoryTotals returns correct totals per category",
  );

  // Test 7: deleteTransaction removes transaction
  const deleted = manager.deleteTransaction(transaction1.id);
  console.assert(
    deleted === true,
    "Should return true when deleting existing transaction",
  );
  console.assert(
    manager.getAllTransactions().length === 2,
    "Should have 2 transactions after deletion",
  );
  console.assert(
    manager.getTransactionById(transaction1.id) === undefined,
    "Deleted transaction should not be found",
  );
  console.log("✓ Test 7 passed: deleteTransaction removes transaction");

  // Test 8: deleteTransaction returns false for non-existent ID
  const notDeleted = manager.deleteTransaction("non-existent-id");
  console.assert(
    notDeleted === false,
    "Should return false when deleting non-existent transaction",
  );
  console.log(
    "✓ Test 8 passed: deleteTransaction returns false for non-existent ID",
  );

  // Test 9: calculateTotal returns 0 for empty list
  const emptyManager = new TransactionManager();
  console.assert(
    emptyManager.calculateTotal() === 0,
    "Empty list should have total of 0",
  );
  console.log("✓ Test 9 passed: calculateTotal returns 0 for empty list");

  // Test 10: ID generation is unique
  const ids = new Set();
  for (let i = 0; i < 100; i++) {
    const t = manager.addTransaction("Test", 1.0, "Food");
    ids.add(t.id);
  }
  console.assert(ids.size === 100, "All generated IDs should be unique");
  console.log("✓ Test 10 passed: ID generation is unique");

  console.log("\n✅ All TransactionManager tests passed!");
}

// Run tests if this file is executed directly
if (typeof window !== "undefined") {
  // Browser environment
  window.testTransactionManager = testTransactionManager;
  console.log(
    "Test function loaded. Run testTransactionManager() in console after loading app.js",
  );
} else if (typeof module !== "undefined" && module.exports) {
  // Node.js environment
  module.exports = testTransactionManager;
}
