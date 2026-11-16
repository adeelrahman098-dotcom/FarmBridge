# 🌾 FarmBridge — Bangladesh Digital Agricultural Marketplace

**FarmBridge** is a modern, responsive digital agricultural marketplace tailored for Bangladesh. It connects **Farmers**, **Bulk Buyers**, **Transport Partners**, and **Platform Administrators** into a transparent, syndicate-free trading ecosystem with live price negotiations and end-to-end tracked logistics.

---

## 🌟 Key Features

### 1. Market Localization for Bangladesh
- **Currency**: BDT (৳) across all listings, offers, delivery fees, and payouts.
- **Agricultural Units**: Kilogram (kg), Maund (40 kg / মণ), Sack (বস্তা), Crate (ক্যারেট), Piece, Dozen, Liter.
- **Agricultural Belts**: Bogura, Rajshahi, Rangpur, Dinajpur, Jashore, Khulna, Cumilla, Mymensingh, Gazipur, Dhaka, Chattogram, etc.
- **Produce Variety**: Bogura Red Diamond Potatoes, Rajshahi Fazli Mangoes, Dinajpur Chinigura Aromatic Rice, Kapotakkho Raw Cow Milk, Mithapukur Red Chili, Gomti Valley Field Tomatoes, Tosha Jute Fiber, and more.

### 2. Multi-Role User Workflows

#### 🌾 Farmer Role (e.g. Rahim Uddin — Bogura)
- **Product Management**: Create, edit, pause, and delete crop listings with harvest dates, photos, and minimum order quantities.
- **Offer Negotiation**: Receive buyer offers, accept terms, decline with reasons, or propose counteroffers with adjusted rates.
- **Order Fulfillment**: Progress orders from confirmed to "Harvested & Packaged" (ready for pickup).
- **Earnings & Statements**: View gross sales, transparent 3% platform facilitation fee, and net payouts.

#### 🛒 Buyer Role (e.g. Anika Tabassum — Bengal Fresh Supermarkets)
- **Marketplace Discovery**: Filter by produce category, district, price slider, and verified farmers only.
- **Direct Offers**: Submit custom bulk proposals specifying volume, offered unit price, and delivery date.
- **Counteroffer Review**: Accept or withdraw when a farmer responds with a counterproposal.
- **Live 8-Stage Tracking**: Follow shipment progress from farm gate, across national highways, to warehouse dropoff.
- **Receipts & Disputes**: Inspect produce, confirm completion, or submit dispute complaints.

#### 🚚 Transport Partner Role (e.g. Rafiqul Islam — Covered Van Carrier)
- **Open Jobs Pool**: Browse available freight requests with cargo weights, pickup/dropoff points, and guaranteed fees.
- **Claim Assignment**: Claim open jobs and get assigned as the official carrier.
- **Milestone Updates**: Advance trip status (`pickup scheduled` → `picked up` → `in transit` → `delivered`).
- **Incident Reporting**: Flag highway delays, mechanical issues, or ferry holdups.

#### 🛡️ Administrator Role (Kabir Chowdhury — Platform Governance)
- **Command Center KPIs**: Total GMV traded, platform commission revenue, active users, and open disputes.
- **KYC Verification Queue**: Review and verify farmer and transport partner identities and land deeds.
- **Catalog Moderation**: Audit and manage produce listings.
- **Dispute Resolution**: Review, mediate, and resolve complaints between buyers, farmers, and carriers.
- **Platform Rules**: Configurable commission rate (default 3%).

---

## ⚡ 1-Click Role Switcher Playground

A persistent top navigation bar allows **instant 1-click switching** between pre-configured demo personas:
- **Farmer**: Rahim Uddin (*Barendra Green Agro, Bogura*)
- **Buyer**: Anika Tabassum (*Bengal Fresh Retail Chain, Dhaka*)
- **Transport**: Rafiqul Islam (*7-Ton Covered Van Carrier*)
- **Admin**: Kabir Chowdhury (*Marketplace Operations & Governance*)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📦 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom agricultural palette (Forest Green, Leaf Green, Harvest Gold, Warm Cream)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **State & Storage**: React Context + Reactive `localStorage` persistence (changes persist across browser refreshes)
