# SpendWise — Expense Tracker

A responsive personal finance tracker created for the **InternNova Week 5 JavaScript Project Assignment** using HTML, CSS and vanilla JavaScript.

## Features

- Add income and expense transactions
- Edit and delete existing transactions
- Live balance, total income, total expenses and current-month expense summaries
- Search by description or category
- Filter by income or expense
- Sort by date or amount
- Form validation for description, amount and date
- Browser `localStorage` persistence
- Responsive layout for desktop, tablet and mobile
- Confirmation before deleting one or all records

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, media queries)
- JavaScript (ES6+, arrays, objects, functions, conditionals, loops, array methods, DOM and events)
- Browser localStorage

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Add a transaction using the form.

No package installation or build process is required. For the best development experience, open the folder in VS Code and use the Live Server extension.

## Project structure

```text
expense-tracker-internnova/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── screenshots/
│   └── (add your project screenshots here)
├── DOCUMENTATION.md
└── README.md
```

## GitHub Pages deployment

1. Create a GitHub account or sign in.
2. Create a new public repository, for example `internnova-week5-expense-tracker`.
3. Upload `index.html`, the `css` folder, the `js` folder, `README.md`, and `DOCUMENTATION.md` (or push them using Git).
4. Open the repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to publish. The website URL will look like:
   `https://YOUR-USERNAME.github.io/internnova-week5-expense-tracker/`
8. Open the URL and test adding, editing, deleting, searching and filtering transactions.
9. Submit the repository URL or live Pages URL as required by your internship instructions.

## Important notes

- Data is stored in the browser on the device where it is entered. It is not synced to another device or backed up to a server.
- Clearing browser site data may remove saved transactions.
- Use fictional sample transactions for screenshots. Do not include real bank or personal financial details.

## Assignment checklist

- [x] Project planning and objective
- [x] HTML and CSS structure
- [x] JavaScript functionality
- [x] DOM manipulation and event handling
- [x] At least three meaningful features
- [x] Documentation and reflection
