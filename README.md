# Mini Seller Console

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

A lightweight React application demonstrating lead management functionalities, including listing, searching, filtering, sorting, inline editing, and conversion to opportunities. Developed as a technical assessment focusing on modern frontend practices, state management, and responsive design.

## Features

* **Leads List**: Table with search (name/company), filter (status), and sort (score descending).  
* **Lead Detail & Editing**: Slide-over panel to view/edit lead details, with inline editing, email validation, optimistic updates, and rollback on failure.
* **Lead Conversion**: Convert a lead into an opportunity, moving it to a separate opportunities table.  
* **Opportunities List**: Table displaying converted opportunities.  
* **State Management**: Centralized via React `useReducer` and Context API.  
* **Persistence**: Search/filter settings and lead data stored in `localStorage`.  
* **Responsive Design**: Adjusts layout for different screen sizes.  
* **Simulated Latency**: API calls simulated via `setTimeout` to demonstrate loading states.

## Project Structure

```
/
├── public/
│   ├── leads.json          # Initial/generated lead data
│   └── vite.svg
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point, wraps App with DataProvider
│   ├── index.css           # Tailwind CSS imports
│   ├── components/         # Reusable UI components
│   │   ├── leads/          # Lead-specific components
│   │   │   ├── LeadsList.jsx
│   │   │   ├── LeadDetail.jsx
│   │   │   └── LeadsTable.jsx
│   │   ├── opportunities/  # Opportunity-specific components
│   │   │   └── OpportunitiesTable.jsx
│   │   └── ui/             # Generic UI elements (e.g., SlideOver)
│   │       └── SlideOver.jsx
│   ├── context/            # State management with useReducer and Context
│   │   ├── DataProvider.jsx
│   │   └── dataReducer.js
│   └── hooks/              # Custom React hooks
│       └── useData.js
├── generateLeads.js        # Script to generate dummy lead data
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
└── README.md               # This file

```

## Technologies Used

*   **React**: Frontend JavaScript library.
*   **Vite**: Fast frontend build tool.
*   **Tailwind CSS**: Utility-first CSS framework.
*   **JavaScript (ESM)**: Programming language.

## Getting Started

### Prerequisites

*   Node.js v14+
*   npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/felixoakz/Mini-Seller-Console.git
    cd mini-seller-console
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Generate initial lead data:
    ```bash
    node generateLeads.js
    ```
