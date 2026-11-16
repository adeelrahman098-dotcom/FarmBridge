# FarmBridge — Antigravity Build Brief

## Copy/paste prompt for Antigravity

Build a polished, responsive web application called **FarmBridge**: a digital agricultural marketplace that directly connects farmers, buyers, transport partners, and platform administrators.

The initial market is Bangladesh, so use **BDT (৳)** for prices and include realistic Bangladesh locations and agricultural products in seed/demo data. The product should feel trustworthy, practical, and easy to use for people who may be more comfortable on mobile than desktop.

Do not make this just a marketing landing page. Create a functional role-based marketplace prototype with interconnected screens, realistic demo data, forms, status changes, filters, notifications, and dashboard flows. Use a clean modern design with a warm agricultural visual identity: leafy green, deep forest, harvest gold, soft cream backgrounds, large readable type, clear buttons, and friendly produce imagery/icons. It should be fully responsive.

---

## Product goal

FarmBridge enables this complete journey:

1. A farmer creates a product listing.
2. A buyer searches and filters available produce.
3. The buyer asks a question or submits an offer.
4. The farmer accepts, rejects, or counters the offer.
5. An accepted offer becomes a confirmed order.
6. A delivery request is created and assigned to a transport partner.
7. The transport partner updates pickup and delivery progress.
8. Buyer and farmer can track the order.
9. On completion, the transaction, commission, analytics, and notifications update.

---

## User roles and permissions

### 1. Farmer

Farmers sell agricultural produce.

- Register and log in as a farmer.
- Create and edit a farmer profile: full name, farm name, phone number, district, upazila, farm address, bio, profile photo, verification status.
- Create, edit, pause, or delete product listings.
- Set product category, photos, available quantity, unit, price, minimum order quantity, harvest date, availability date, and pickup location.
- View incoming buyer messages and offers.
- Accept, reject, or send a counteroffer.
- View and update their orders.
- Request delivery and monitor transport status.
- View earnings, sales statistics, and notifications.

### 2. Buyer

Buyers discover and purchase produce.

- Register and log in as a buyer.
- Create and edit a buyer/business profile: name, business name, phone, delivery address, district, and profile photo.
- Browse the marketplace and view product details.
- Search and filter products by category, location, price range, quantity, availability, and verified farmer.
- Save favourite products.
- Message farmers.
- Submit offers with required quantity, proposed unit price, note, and preferred delivery date.
- View counteroffers and accept or decline them.
- Track orders and delivery progress.
- View purchase history, notifications, and invoices/transaction records.

### 3. Transport partner

Transport partners coordinate delivery.

- Create a transport partner profile: company/driver name, phone, vehicle type, service areas, capacity, and vehicle registration.
- See assigned and available delivery jobs.
- Accept an available delivery job when applicable.
- Update delivery states: assigned, pickup scheduled, picked up, in transit, delivered, issue reported.
- See pickup/drop-off details, shipment quantity, contact information, and delivery fee.

### 4. Administrator

Administrators operate and monitor the marketplace.

- See platform overview metrics.
- Verify, approve, suspend, or reject user accounts.
- Review product listings and remove inappropriate items.
- Monitor offers, orders, delivery issues, transactions, and commissions.
- Manage complaints.
- Configure the commission percentage.
- View reports for sales, transaction volume, demand, users, and platform revenue.

---

## Required pages and navigation

Create a public top navigation with the FarmBridge logo, Marketplace, How It Works, About, Log In, and Get Started.

### Public pages

1. **Home / landing page**
   - Hero: “From Farm to Market, Made Simple.”
   - Primary calls to action: “Explore Produce” and “Start Selling.”
   - Search bar with produce/location search.
   - Popular categories.
   - Featured produce listings.
   - Four-step “How FarmBridge Works” explanation.
   - Trust statistics, farmer highlight, and footer.

2. **Marketplace / product listing page**
   - Product-card grid with photo, product name, category, farmer name, location, availability, quantity, price per unit, and verified badge.
   - Search field and filters for category, district, price range, quantity, and verified farmer.
   - Sort options: newest, price low-to-high, price high-to-low, nearest.
   - Empty state when no filters match.

3. **Product details page**
   - Image gallery, product details, quantity, pricing, location, availability, product description, and farm details.
   - Farmer information card with verification badge and response rate.
   - “Message Farmer”, “Make an Offer”, and “Save” actions.
   - Suggested related products.

4. **Authentication pages**
   - Login.
   - Sign up with role choice (Farmer, Buyer, Transport Partner).
   - Friendly form validation and post-signup onboarding.

### Authenticated shared pages

- Notifications centre.
- Messages inbox and a conversation detail page.
- Profile and account settings.
- Help / complaints form.

### Farmer dashboard

- Dashboard overview with active listings, pending offers, active orders, monthly sales, and recent activity.
- My Products: list/grid view, product status, inventory, create product button, edit form.
- Offers: pending, countered, accepted, rejected tabs; details panel and action buttons.
- Orders: tracking status and fulfilment management.
- Delivery coordination.
- Sales/earnings insight page.

### Buyer dashboard

- Dashboard overview: active orders, saved products, pending offers, recent notifications.
- My Offers: submitted, countered, accepted, declined.
- My Orders: order cards, payment status, delivery tracker, order detail.
- Saved Products.
- Purchase/transaction history.

### Transport partner dashboard

- Dashboard overview: assigned deliveries, completed deliveries, earnings estimate, urgent jobs.
- Delivery jobs list with filter by status.
- Delivery job detail with a visual status timeline and status update controls.

### Admin dashboard

- Overview metric cards: total users, active farmers, active listings, orders this month, gross marketplace value, commission revenue, open complaints.
- Charts for sales trend and product/category demand.
- User verification queue.
- Product moderation table.
- Orders and transaction table.
- Complaints management.
- Reports page with downloadable-looking report cards and date/filter controls.

---

## Core interactions and rules

### Product management

Only farmers can create listings. The add-product form must include:

- Product name
- Category
- Description
- Price per unit
- Unit (kg, maund, dozen, piece, sack, crate)
- Available quantity
- Minimum order quantity
- Harvest/available date
- District and pickup address
- At least one product image
- Listing status: active or paused

### Search and filters

Product search must update the displayed list. Category, district, price, quantity, and verified-farmer filters should work together and visibly show active filters.

### Messaging

Messages should look like a simple chat experience. Every product page should allow a buyer to start a conversation with the relevant farmer. Include messages about availability, quantity, price, and delivery.

### Offers and negotiation

Buyers submit an offer with quantity, offered price per unit, expected delivery date, and optional note. A farmer can:

- Accept the offer.
- Reject the offer, with an optional reason.
- Send a counteroffer with revised price, quantity, and note.

When a buyer accepts a counteroffer, automatically create an order. Show an offer timeline/history so the negotiation is understandable.

### Orders and status lifecycle

Use the following clear order statuses:

`Offer accepted → Order confirmed → Preparing for pickup → Pickup scheduled → Picked up → In transit → Delivered → Completed`

Also support `Cancelled` and `Issue reported`.

Show a visual progress tracker on order detail pages. Both farmer and buyer can see relevant delivery status. The farmer can move an order into preparing; transport partners update pickup and delivery statuses; the buyer can mark a delivered order as completed.

### Logistics

Once an order is confirmed, a farmer can create a transport request including pickup address, destination address, goods quantity, preferred pickup date, special instructions, and delivery fee. An admin can assign a transport partner, or a transport partner can accept an available request.

### Transactions

For each completed order, record:

- Product subtotal
- Delivery fee
- Platform commission (default 3%)
- Farmer payout
- Transaction/payment status

For the MVP, display payment status as `Pending`, `Paid`, or `Cash on delivery`; do not integrate a real payment gateway unless supported by the platform.

### Notifications

Show an unread count in the header and create realistic in-app notifications for:

- New message
- New offer
- Counteroffer received
- Offer accepted/rejected
- Order confirmation
- Pickup and delivery status changes
- Account verification updates

---

## Data model

Set up the data structure (or mock data/API structure) around these entities:

- User: id, name, email, phone, role, avatar, verificationStatus, createdAt
- FarmerProfile: userId, farmName, bio, district, upazila, address, rating
- BuyerProfile: userId, businessName, deliveryAddress, district
- TransportProfile: userId, companyName, vehicleType, capacity, serviceAreas, registrationNumber
- Product: id, farmerId, name, category, description, price, unit, quantity, minOrderQuantity, images, district, address, harvestDate, status, createdAt
- Conversation and Message
- Offer: id, productId, buyerId, farmerId, quantity, offeredUnitPrice, requestedDeliveryDate, note, status, parentOfferId, createdAt
- Order: id, offerId, buyerId, farmerId, product snapshot, total, paymentStatus, orderStatus, deliveryAddress, createdAt
- Delivery: id, orderId, transportPartnerId, pickupAddress, dropoffAddress, pickupDate, fee, status, instructions
- Transaction: id, orderId, subtotal, deliveryFee, commissionRate, commissionAmount, farmerPayout, paymentStatus
- Notification: id, userId, type, title, message, isRead, createdAt
- Complaint: id, submittedBy, relatedOrderId, category, description, status

---

## Demo data

Include enough realistic seeded data to make the application feel complete:

- At least 8 farmers, 5 buyers, 3 transport partners, and 1 administrator.
- At least 16 active products across vegetables, fruits, grains, spices, dairy, and poultry.
- Use examples such as fresh potatoes, red chili, seasonal mangoes, jute, rice, tomatoes, eggplant, mustard oil, eggs, milk, and ginger.
- Use Bangladesh locations such as Rangpur, Bogura, Rajshahi, Jashore, Khulna, Cumilla, Mymensingh, Gazipur, Dhaka, and Chattogram.
- Include pending offers, a counteroffer, confirmed orders, in-transit orders, a completed order, notifications, delivery jobs, and an open complaint.

Provide quick demo-role access or clear sample credentials so each role can be explored without a lengthy setup process.

---

## Design system

- Brand name: **FarmBridge**.
- Logo concept: a subtle bridge/leaf/field motif.
- Main colours: deep green, fresh green, harvest gold, warm cream, white, and neutral charcoal.
- Use an accessible contrast ratio and large, legible form controls.
- Use cards with soft shadows and modest rounded corners; avoid an overly generic dashboard look.
- Use clear status chips consistently: pending = amber, confirmed = blue, in transit = violet/blue, delivered = green, cancelled = red.
- Add friendly empty states, loading states, validation messages, success feedback, and confirmation dialogs for important actions.
- Desktop dashboard navigation can use a left sidebar; mobile should use a compact menu/bottom navigation where appropriate.

---

## Technical expectations

- Build reusable components for product cards, status chips, filters, data tables, offer cards, notification items, message bubbles, order timelines, and dashboard metric cards.
- Use a robust responsive layout and semantic accessible HTML.
- Protect screens/data by role; users should never see actions intended for another role.
- Persist newly created or edited mock data during the current browser session if a real backend is not configured.
- Keep the architecture ready for a future backend, real authentication, image storage, payments, and reporting service.
- Ensure all buttons and primary flows work in the prototype. Do not leave key actions as dead UI.

---

## Build priority

Implement in this order:

1. Responsive visual foundation, navigation, auth, roles, and demo data.
2. Marketplace browsing, filters, product details, and farmer product management.
3. Messaging and the offer/counteroffer/acceptance flow.
4. Order creation, order tracking, and logistics coordination.
5. Notifications, transactions, and role dashboards.
6. Admin verification, moderation, complaints, and reporting.

Start by creating the complete high-fidelity frontend and functional demo flows. If a backend/database is available, implement it using the data model above; otherwise, use structured local mock data and make the flows convincingly interactive.
