# All Some Mart - E-Commerce Frontend

A modern, responsive e-commerce web application built for the **Sisters in Tech by RISTEK Fasilkom UI 2026 - Mentee Hands On 2 Task (Frontend Engineering)**.

## 🚀 Features

This project fulfills all the requirements set in the Hands On 2 Task document:

1. **Data Fetching:** Successfully fetches products and categories from the provided SISTECH E-commerce API.
2. **Data Mapping:** Displays fetched product and category data dynamically using React's array mapping capabilities.
3. **Search & Filtering:**
   - **Search:** Users can search for products by name using the search bar in the header.
   - **Category Filter:** Users can filter products by clicking on sleek category buttons on the homepage.
4. **Conditional UI:** 
   - **Loading State:** Displays a custom loading spinner while fetching API data.
   - **Error State:** Shows clear error messages if the API fetch fails.
   - **Empty State:** Shows a friendly "Not Found" message and illustration if a search query or filter yields no products.
5. **Product Detail:** Users can click on any product card to navigate to a dedicated detail page that displays full product information.
6. **Reusable Components:** The architecture is built on modular, reusable components such as `Header.jsx`, `Footer.jsx`, `ProductCard.jsx`, and `LoadingSpinner.jsx`.

### ✨ Extra UI/UX Enhancements (Bonus Creativity)
To deliver a premium shopping experience comparable to modern marketplaces (Tokopedia, Shopee, Lazada), this project includes several UI upgrades:
- **Dynamic Hero Carousel:** An auto-sliding hero section featuring promotional banners.
- **Flash Sale Section:** A dedicated section highlighting discounted items with an active countdown timer.
- **Premium Product Cards:** Cards feature hover micro-animations, dummy rating systems, and quick action buttons (Wishlist, Quick View, Add to Cart).
- **Modern Color Scheme:** A vibrant, warm color palette (Orange & Dark Gray) designed specifically for e-commerce conversion.

## 🛠️ Tech Stack

- **React.js** (Vite)
- **Tailwind CSS** (for rapid, responsive styling)
- **React Router** (for page navigation)
- **Axios** (for API communication)

## 🏃‍♂️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/RevinaAgustin frontend-ho2-ecommerce
   ```
2. Navigate to the project directory:
   ```bash
   cd all-some-mart
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit the local server address (usually `http://localhost:5173`).

## 📞 API Reference
This project relies on the SISTECH E-commerce API.
- Base URL: `https://sistech-ecommerce-api.leficullen.xyz`

---
*Created as part of the Sisters in Tech (SISTECH) by RISTEK Fasilkom UI 2026 program.*
