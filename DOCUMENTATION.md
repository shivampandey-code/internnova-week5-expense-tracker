# SpendWise — Project Documentation

## Project Overview and Objective

SpendWise is a responsive expense-tracking web application created for the InternNova Week 5 JavaScript Project Assignment. It helps users record income and expenses and monitor their balance in a browser.

## Target Users

Students and individuals tracking personal income and spending.

## Main Features

- Add income and expense transactions with description, amount, category, and date.
- Edit or delete existing transactions.
- View available balance, total income, total expenses, and current-month expenses.
- Search by description or category.
- Filter by transaction type and sort by date or amount.
- Validate form inputs and display helpful error messages.
- Save records in browser localStorage so they remain after a page refresh.
- Use the application on desktop, tablet, and mobile screens.

## Technologies Used

The project uses HTML5, CSS3, and vanilla JavaScript. No framework or database is required.

## JavaScript Concepts Used

Variables and constants store data and DOM references. Functions organize tasks such as saving records, calculating summaries, rendering transactions, and validating inputs. Arrays store transaction objects. Conditional statements handle validation and income/expense logic. Loops and array methods such as `filter()`, `reduce()`, `map()`, and `sort()` process records. DOM manipulation creates transaction rows and updates summary cards. Event listeners handle form submission, search, filtering, sorting, editing, and deletion. `localStorage` provides browser-based data persistence.

## Screenshots

Run `index.html`, add sample data, and save dashboard and mobile screenshots in `screenshots/`.

## Challenges and Solutions

One challenge was keeping the summary cards and transaction list synchronized. I solved this by maintaining one transaction array and refreshing the summary and list after every change. Another challenge was retaining records after refreshing the page; localStorage solves this by saving and loading the transaction array. Input validation and confirmation prompts also reduce invalid entries and accidental deletion.

## Learning Outcomes

I learned to connect forms with JavaScript, work with arrays of objects, use array methods, manipulate the DOM, handle events, validate input, and store data in the browser. I practised separating HTML, CSS, and JavaScript files.

## Future Improvements and Conclusion

Future versions could include charts, CSV downloads, budget limits, recurring transactions, dark mode, and cloud synchronization. SpendWise demonstrates how core JavaScript concepts can be combined to build a practical, interactive, and responsive web application.
