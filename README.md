# ☕ BrewNova — Coffee Shop Application

> A full-featured coffee shop web application built with React + Vite, powered by AI (Claude API).

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Modules](#pages--modules)
- [AI Chatbot](#ai-chatbot)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## 📖 About the Project

BrewNova is a mobile and web application for placing online orders for coffee powder, food, and beverages. It is designed to stand out from competitors like Swiggy and Zomato by offering:

- GPS-based nearest store detection
- Personalized promotions based on time, location, and user profile
- Recipe-based inventory/stock management
- Unique location-aware notifications (e.g., Mantri Mall area alerts)
- Coffee powder ordering with store selection via map

Built as a proposal for **Mobilean Technologies Pvt Ltd**.

---

## ✨ Features

### 👤 User Features
| Feature | Description |
|---|---|
| 🔐 Register / Login | Sign up with name, email, phone, date of birth |
| 📍 Store Finder | GPS-based nearest store detection across Bangalore |
| ☕ Menu Browsing | Browse Coffee, Food, Beverages, and Coffee Powder |
| 🛒 Cart & Ordering | Add items, choose store, pick delivery or pickup |
| 🚚 Order Tracking | View order history with live status tracker |
| 🎁 Promotions | Lunch combos, morning boosts, birthday specials, loyalty rewards |
| 🤖 AI Barista | Chat with BrewBot for recommendations and help |

### 🛠️ Admin Features
| Feature | Description |
|---|---|
| 📦 Inventory Management | Real-time stock levels with recipe-based tracking |
| ⚠️ Low Stock Alerts | Automatic alerts when items fall below threshold |
| ➕ Stock Adjustment | Increase or decrease stock with +/- controls |
| 🧪 Ingredient Tracking | Each item tracks its ingredients for recipe costing |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Inline CSS with CSS variables, Google Fonts |
| Fonts | Playfair Display, DM Sans |
| AI Chatbot | Anthropic Claude API (claude-sonnet-4) |
| State Management | React useState / useEffect |
| Build Tool | Vite |
| Package Manager | npm |

---

## 📁 Project Structure

```
coffee-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          ← Main application (all components)
│   ├── index.css        ← Global styles (dark background fix)
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

**1. Create Vite React project**
```bash
npm create vite@latest coffee-app -- --template react
cd coffee-app
npm install
```

**2. Replace src/App.jsx**

Copy the full `coffee-shop-app.jsx` code into `src/App.jsx`

**3. Fix src/index.css**

Replace the contents of `src/index.css` with:
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  min-height: 100vh;
  background: #0f0a06;
  overflow-x: hidden;
}
```

**4. Run the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:5173
```

---

## 📄 Pages & Modules

### 🏠 Home Page
- Hero section with animated decorative rings
- Feature highlights (GPS, Promotions, Inventory, AI, etc.)
- Live promotions strip

### ☕ Menu Page
- 11 items across 4 categories: Coffee, Food, Beverages, Powder
- Search bar + category filter buttons
- Stock level indicator per item
- Add to Cart functionality

### 📍 Stores Page
- 4 Bangalore locations: Koramangala, Indiranagar, Mantri Mall, Whitefield
- Open/Closed status badges
- Distance from user
- Click to expand store details
- Google Maps integration placeholder

### 🎁 Promotions Page
- 6 active promotions with time slots
- Lunch Combo, Morning Boost, Birthday Special
- Evening Unwinder, Weekend Brunch, Loyalty Reward

### 🛒 Cart Page
- Item quantity controls
- Store selector (open stores only)
- Delivery / Pickup toggle
- Order total with delivery fee
- One-click order placement

### 📋 Orders Page
- Full order history
- Order status progress tracker
- Store, mode, time, and item details per order

### 📦 Inventory Page *(Admin)*
- All 11 menu items with stock levels
- Visual stock bar per item
- +5 / -5 stock adjustment controls
- Red low-stock warning banner
- Ingredient list per item

---

## 🤖 AI Chatbot — BrewBot

BrewBot is an AI-powered barista assistant using the **Anthropic Claude API**.

### Capabilities
- Menu recommendations based on time of day
- Coffee knowledge and brewing tips
- Store location help
- Promotion and offer details
- General coffee Q&A

### How it works
- Click the 🤖 button (bottom-right corner)
- Type your question and press Enter or →
- BrewBot responds using Claude Sonnet

> **Note:** BrewBot requires an Anthropic API key to function.  
> In the Claude.ai hosted version it works automatically.  
> For local development, set up a backend proxy with your API key.

---

## 🗺️ Store Locations

| Store | Address | Status |
|---|---|---|
| Koramangala | 80 Feet Road, Koramangala | ✅ Open |
| Indiranagar | 100 Feet Road, Indiranagar | ✅ Open |
| Mantri Mall | Mantri Square, Malleshwaram | ❌ Closed |
| Whitefield | ITPL Road, Whitefield | ✅ Open |

---

## 🔮 Future Enhancements

- [ ] Real backend with Node.js + Express
- [ ] MongoDB / PostgreSQL database
- [ ] Google Maps API integration for live GPS
- [ ] Push notifications (Firebase)
- [ ] Payment gateway (Razorpay / Stripe)
- [ ] Admin dashboard with analytics
- [ ] Mobile app (React Native)
- [ ] Real-time order tracking with WebSockets
- [ ] Loyalty points system
- [ ] Multi-language support (Kannada, Hindi)

---

## 👨‍💻 Developed For

**Mobilean Technologies Pvt Ltd**  
Proposal for Mobile Application Development  
Coffee Shop Application — BrewNova

---

## 📞 Contact

For queries regarding this project, contact the development team at Mobilean Technologies.

---

*Built with ☕ and React*
