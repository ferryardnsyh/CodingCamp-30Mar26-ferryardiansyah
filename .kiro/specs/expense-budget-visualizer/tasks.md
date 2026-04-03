# Implementation Plan: Expense & Budget Visualizer

## Overview

This plan breaks down the implementation of the Expense & Budget Visualizer into discrete, actionable coding tasks. The application will be built using vanilla HTML, CSS, and JavaScript following an MVC pattern with Local Storage persistence. Each task builds incrementally, ensuring core functionality is validated early through property-based and unit tests.

## Tasks

- [x] 1. Set up project structure and HTML foundation
  - Create directory structure: css/ and js/ folders
  - Create index.html with semantic HTML structure
  - Include form with Item Name (text input), Amount (number input), and Category (select with Food, Transport, Fun options)
  - Add transaction list container with scrollable area
  - Add balance display section
  - Add canvas element for pie chart
  - Link to css/styles.css and js/app.js
  - _Requirements: 1.1, 1.2, 7.1, 7.6, 7.7_

- [ ] 2. Implement CSS styling
  - [x] 2.1 Create css/styles.css with complete application styling
    - Implement clear visual hierarchy with prominent balance display
    - Use minimum 14px font size for body text
    - Ensure sufficient color contrast for readability
    - Provide visual separation between form, transaction list, and chart
    - Apply minimal design aesthetic
    - Make transaction list scrollable
    - Style form inputs and buttons
    - Style delete controls for transactions
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 2.3, 7.2_

- [ ] 3. Implement TransactionManager class (Data Layer)
  - [-] 3.1 Create TransactionManager class with core methods
    - Implement constructor to initialize empty transactions array
    - Implement addTransaction(itemName, amount, category) with ID generation using Date.now() and Math.random()
    - Implement deleteTransaction(id) to remove transaction by ID
    - Implement getAllTransactions() to return all transactions
    - Implement getTransactionById(id) for lookup
    - Implement calculateTotal() to sum all transaction amounts
    - Implement getCategoryTotals() to return object with totals per category
    - _Requirements: 1.3, 1.4, 3.2, 4.1, 5.2_

  - [ ]\* 3.2 Write property test for transaction addition
    - **Property 1: Valid Transaction Addition**
    - **Validates: Requirements 1.3, 1.4, 2.2**
    - Use fast-check to generate random valid transactions
    - Verify transaction appears in getAllTransactions() with correct data
    - Tag: `Feature: expense-budget-visualizer, Property 1: Valid Transaction Addition`

  - [ ]\* 3.3 Write property test for balance calculation
    - **Property 7: Balance Calculation Accuracy**
    - **Validates: Requirements 4.1, 3.3**
    - Generate random transaction sets
    - Verify calculateTotal() equals sum of all amounts
    - Tag: `Feature: expense-budget-visualizer, Property 7: Balance Calculation Accuracy`

  - [ ]\* 3.4 Write property test for category totals
    - **Property 8: Category Total Calculation**
    - **Validates: Requirements 5.2**
    - Generate random transaction sets
    - Verify getCategoryTotals() equals sum per category
    - Tag: `Feature: expense-budget-visualizer, Property 8: Category Total Calculation`

  - [ ]\* 3.5 Write unit tests for TransactionManager edge cases
    - Test empty transaction list (calculateTotal returns 0)
    - Test single transaction
    - Test deletion of non-existent ID
    - Test large amounts (number precision)

- [ ] 4. Implement Local Storage integration
  - [~] 4.1 Add storage methods to TransactionManager
    - Implement saveToStorage() to persist transactions array to Local Storage as JSON
    - Implement loadFromStorage() to retrieve and parse transactions from Local Storage
    - Use storage key: "expense-tracker-transactions"
    - Handle JSON parsing errors gracefully (clear corrupted data)
    - Detect Local Storage availability and handle unavailable case
    - Handle QuotaExceededError when saving
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]\* 4.2 Write property test for storage round-trip
    - **Property 10: Storage Persistence Round-Trip**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6**
    - Generate random transaction sets
    - Save to storage, load back, verify equivalence of all fields
    - Tag: `Feature: expense-budget-visualizer, Property 10: Storage Persistence Round-Trip`

  - [ ]\* 4.3 Write unit tests for storage error conditions
    - Test corrupted JSON in Local Storage
    - Test Local Storage unavailable scenario
    - Test storage quota exceeded scenario

- [~] 5. Checkpoint - Verify data layer functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement ChartRenderer class (Presentation Layer)
  - [x] 6.1 Create ChartRenderer class with canvas rendering
    - Implement constructor(canvasElement) to store canvas reference
    - Implement render(categoryTotals) to draw pie chart
    - Implement clear() to reset canvas
    - Implement drawPieSlice(centerX, centerY, radius, startAngle, endAngle, color) for segments
    - Implement drawLegend(categories) to display category labels and percentages
    - Use category colors: Food (#FF6B6B), Transport (#4ECDC4), Fun (#FFE66D)
    - Handle empty data set with appropriate empty state display
    - Handle division by zero when calculating percentages
    - _Requirements: 5.1, 5.3, 5.6_

  - [ ]\* 6.2 Write property test for chart distribution
    - **Property 9: Chart Distribution Display**
    - **Validates: Requirements 5.1, 5.3, 3.4**
    - Generate random transaction sets with multiple categories
    - Verify chart rendering creates segments for each category with transactions
    - Verify segment proportions match category totals
    - Tag: `Feature: expense-budget-visualizer, Property 9: Chart Distribution Display`

  - [ ]\* 6.3 Write unit tests for chart edge cases
    - Test empty transaction set (empty state display)
    - Test single category
    - Test all three categories with equal amounts
    - Test canvas element not available

- [ ] 7. Implement UIController class (Presentation Layer)
  - [~] 7.1 Create UIController class with rendering methods
    - Implement constructor(transactionManager) to store manager reference
    - Implement init() to set up DOM element references and ChartRenderer
    - Implement renderTransactionList() to display all transactions with delete buttons using event delegation
    - Implement renderBalance() to update balance display with formatted total
    - Implement renderChart() to trigger ChartRenderer with category totals
    - Implement showValidationError(message) to display error message
    - Implement clearValidationError() to remove error message
    - Implement clearForm() to reset all form input fields
    - Use textContent instead of innerHTML for user-provided data (XSS prevention)
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 4.1, 5.1, 1.5, 1.7_

  - [ ]\* 7.2 Write property test for complete transaction display
    - **Property 4: Complete Transaction Display**
    - **Validates: Requirements 2.1, 2.4**
    - Generate random arrays of transactions
    - Verify all transactions appear in rendered list
    - Tag: `Feature: expense-budget-visualizer, Property 4: Complete Transaction Display`

  - [ ]\* 7.3 Write property test for delete control presence
    - **Property 6: Delete Control Presence**
    - **Validates: Requirements 3.1**
    - Generate random transactions
    - Verify delete control exists in rendered output for each transaction
    - Tag: `Feature: expense-budget-visualizer, Property 6: Delete Control Presence`

  - [ ]\* 7.4 Write property test for form clearing
    - **Property 3: Form Clearing After Submission**
    - **Validates: Requirements 1.7**
    - Generate random valid transactions
    - Submit form and verify all fields are empty
    - Tag: `Feature: expense-budget-visualizer, Property 3: Form Clearing After Submission`

  - [ ]\* 7.5 Write unit tests for UIController edge cases
    - Test rendering with very long item names
    - Test rendering with large amounts (number formatting)
    - Test rendering with maximum transactions (performance validation)
    - Test balance display when no transactions exist (shows zero)

- [ ] 8. Implement FormHandler class (Event Layer)
  - [~] 8.1 Create FormHandler class with validation and submission
    - Implement constructor(transactionManager, uiController) to store references
    - Implement init() to attach form submit event listener
    - Implement handleSubmit(event) to prevent default and coordinate transaction creation
    - Implement validateForm(itemName, amount, category) to check all fields are non-empty and amount is positive
    - Implement getFormData() to extract values from form inputs
    - Coordinate with TransactionManager to add transaction
    - Coordinate with UIController to update all displays
    - Trigger saveToStorage() after successful creation
    - Display validation errors for empty fields or invalid amount
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.7, 6.1_

  - [ ]\* 8.2 Write property test for invalid input rejection
    - **Property 2: Invalid Input Rejection**
    - **Validates: Requirements 1.5, 1.6**
    - Generate random combinations of empty/missing fields
    - Verify error display and transaction list unchanged
    - Tag: `Feature: expense-budget-visualizer, Property 2: Invalid Input Rejection`

  - [ ]\* 8.3 Write unit tests for form validation edge cases
    - Test negative amount rejection
    - Test zero amount rejection
    - Test non-numeric amount rejection
    - Test empty string after trimming
    - Test invalid category value

- [ ] 9. Implement transaction deletion flow
  - [~] 9.1 Add delete button event handling to UIController
    - Use event delegation on transaction list container
    - Extract transaction ID from delete button data attribute
    - Call TransactionManager.deleteTransaction(id)
    - Trigger saveToStorage() after deletion
    - Update all UI components (list, balance, chart)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 6.2_

  - [ ]\* 9.2 Write property test for transaction deletion
    - **Property 5: Transaction Deletion**
    - **Validates: Requirements 2.5, 3.2**
    - Generate random transaction sets
    - Pick random transaction to delete
    - Verify removal from list and model
    - Tag: `Feature: expense-budget-visualizer, Property 5: Transaction Deletion`

  - [ ]\* 9.3 Write unit tests for deletion edge cases
    - Test deleting last transaction (balance becomes zero, chart shows empty state)
    - Test deleting from single transaction list
    - Test deleting non-existent transaction ID

- [~] 10. Checkpoint - Verify core functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement application initialization and wiring
  - [~] 11.1 Create main application initialization in js/app.js
    - Instantiate TransactionManager
    - Instantiate UIController with TransactionManager
    - Instantiate FormHandler with TransactionManager and UIController
    - Call loadFromStorage() on application load
    - Initialize all UI components with loaded data
    - Call init() on UIController and FormHandler
    - Wrap initialization in DOMContentLoaded event listener
    - _Requirements: 6.3, 6.4, 6.5, 6.6_

  - [ ]\* 11.2 Write integration tests for complete flows
    - Test form submission flow: validation → creation → storage → display
    - Test deletion flow: UI click → model update → storage → display
    - Test load flow: storage → model → display all components
    - Test empty state flow: no transactions → zero balance → empty chart

- [ ] 12. Implement performance optimizations
  - [~] 12.1 Optimize rendering and updates
    - Batch DOM updates to minimize reflows
    - Ensure all updates complete within 100ms
    - Verify responsive interactions with up to 1000 transactions
    - Add performance timing logs for debugging
    - _Requirements: 4.2, 4.3, 5.4, 5.5, 9.2, 9.3, 9.4_

  - [ ]\* 12.2 Write performance validation tests
    - Test load time with 1000 transactions (should be under 1 second)
    - Test update time for add/delete operations (should be under 100ms)
    - Test form interaction feedback (should be under 50ms)

- [ ] 13. Implement accessibility features
  - [~] 13.1 Add accessibility enhancements
    - Add ARIA labels to form fields
    - Add ARIA labels to delete buttons
    - Ensure keyboard navigation works for all interactive elements
    - Verify logical focus order
    - Return focus to form after transaction creation
    - Provide text alternative for chart data (category totals list)
    - Verify color contrast meets WCAG AA standards
    - _Requirements: 10.3_

  - [ ]\* 13.2 Write accessibility tests
    - Test keyboard navigation through form and delete buttons
    - Test screen reader compatibility (ARIA labels present)
    - Test focus management after form submission

- [~] 14. Final checkpoint and browser compatibility verification
  - Ensure all tests pass, ask the user if questions arise.
  - Manually test in Chrome, Firefox, Edge, and Safari
  - Verify responsive behavior and visual consistency
  - Validate performance across browsers
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check with minimum 100 iterations
- All property tests include proper tagging for feature tracking
- Checkpoints ensure incremental validation at key milestones
- The application uses vanilla JavaScript with no external dependencies (except fast-check for testing)
- Single CSS file in css/ directory and single JavaScript file in js/ directory per requirements
