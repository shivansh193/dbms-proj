# MarketPlace - Pages & Routes Reference

This is our internal reference doc for all implemented and planned pages/routes. Use this when developing new features to maintain consistent URL patterns and avoid route conflicts.

## Quick Links

- [Public Pages](#public-pages)
- [Customer Area](#customer-area)
- [Vendor Portal](#vendor-portal)
- [Admin Dashboard](#admin-dashboard)
- [API Endpoints](#api-endpoints)
  - [Customer API](#customer-api)
  - [Vendor API](#vendor-api)
  - [Store API](#store-api)
  - [Product API](#product-api)
  - [Cart API](#cart-api)
  - [Order API](#order-api)
  - [Review API](#review-api)
- [App Router Pages](#app-router-pages)
- [Feature Reference](#feature-reference)

## Public Pages

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Home** | `/` | Main landing page | Featured products, popular stores, categories |
| **Product Listing** | `/product-listing` | All products listing | Filtering, sorting, pagination |
| **Product Detail** | `/product-detail` | Individual product details | Product info, reviews, add to cart |
| **Search Results** | `/search` | Search results page | Product search results, filtering |
| **Location** | `/location` | Location selection | Store location picker, geospatial features |

## Customer Area

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Account** | `/customer/account` | Customer account management | Profile editing, order history |
| **Cart** | `/cart` | Shopping cart | View items, update quantities, remove items |
| **Checkout** | `/checkout` | Checkout process | Shipping, payment, order review |
| **Wishlist** | `/wishlist` | Customer wishlist | Add/remove items, move to cart |
| **Reviews** | `/reviews` | Customer reviews | View, edit, delete reviews |
| **Category Browse** | `/customer/categories` | Browse product categories | Category navigation, featured products |
| **Location Picker** | `/customer/location` | Set customer location | Map interface, address search |
| **Vendor Profile** | `/customer/vendor-profile` | View vendor details | Vendor info, store listings, ratings |

## Vendor Portal

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Dashboard** | `/vendor/dashboard` | Vendor main dashboard | Overview, stats, quick actions |
| **Order Management** | `/vendor/orders` | Vendor's orders management | Order listing, processing, status updates |
| **Product Management** | `/vendor/products` | Vendor's products management | List, create, edit, delete products |
| **Store Profile** | `/vendor/store-profile` | Store management | Store details, location, settings |
| **Payment History** | `/vendor/payments` | Vendor payout history | Payment records, commission tracking |

## Admin Dashboard

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Admin Dashboard** | `/admin/dashboard` | Admin main dashboard | Overview, stats, quick actions |

## API Endpoints

> **Note:** All API endpoints return JSON and require appropriate authentication unless specified otherwise. Error responses follow standard HTTP status codes with a consistent error object format.

### Customer API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/customer` | GET | Get all customers | `page`, `limit`, `search` | List of customers with pagination |
| `/api/customer` | POST | Create a new customer | Customer data | Created customer |
| `/api/customer` | PUT | Update customer | Customer data | Updated customer |
| `/api/customer` | DELETE | Delete customer | `id` | Success message |

### Vendor API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/vendor` | GET | Get all vendors | `page`, `limit`, `search` | List of vendors with pagination |
| `/api/vendor` | POST | Create a new vendor | Vendor data | Created vendor |
| `/api/vendor/[id]` | GET | Get vendor by ID | `id` | Vendor details |
| `/api/vendor/[id]` | PUT | Update vendor | `id`, Vendor data | Updated vendor |
| `/api/vendor/[id]` | DELETE | Delete vendor | `id` | Success message |
| `/api/vendor/analytics` | GET | Get vendor analytics | Auth token, `period` | Analytics data |
| `/api/vendor/payouts` | GET | Get vendor payouts | Auth token, `page`, `limit` | List of payouts with pagination |

### Store API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/store` | GET | Get all stores | `page`, `limit`, `search` | List of stores with pagination |
| `/api/store` | POST | Create a new store | Store data | Created store |
| `/api/stores/[id]` | GET | Get store by ID | `id`, `page`, `limit` | Store details with products |
| `/api/stores/[id]` | PUT | Update store | `id`, Store data | Updated store |
| `/api/stores/[id]` | DELETE | Delete store | `id` | Success message |
| `/api/stores/nearby` | GET | Get nearby stores | `lat`, `lng`, `radius` | List of nearby stores |

### Product API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/products` | GET | Get all products | `page`, `limit`, `search`, `category` | List of products with pagination |
| `/api/products` | POST | Create a new product | Product data | Created product |
| `/api/products/[id]` | GET | Get product by ID | `id` | Product details |
| `/api/products/[id]` | PUT | Update product | `id`, Product data | Updated product |
| `/api/products/[id]` | DELETE | Delete product | `id` | Success message |
| `/api/product` | GET | Get product data | `id` | Product details |
| `/api/search` | GET | Search products | `query`, `page`, `limit` | Search results with pagination |

### Cart API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/cart` | GET | Get cart | Auth token | Cart with items |
| `/api/cart` | POST | Create cart | Auth token | Created cart |
| `/api/cart` | DELETE | Clear cart | Auth token | Success message |
| `/api/cart/items` | POST | Add item to cart | Auth token, `productId`, `quantity` | Updated cart |
| `/api/cart/items` | PUT | Update cart item | Auth token, `productId`, `quantity` | Updated cart |
| `/api/cart/items` | DELETE | Remove item from cart | Auth token, `productId` | Updated cart |

### Order API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/orders` | GET | Get all orders | Auth token, `page`, `limit`, `status` | List of orders with pagination |
| `/api/orders` | POST | Create a new order | Auth token, Order data | Created order |
| `/api/orders` | PUT | Update order | `id`, Order data | Updated order |

### Review API

| API Route | HTTP Method | Description | Request Parameters | Response |
|-----------|-------------|-------------|-------------------|----------|
| `/api/reviews` | GET | Get all reviews | `page`, `limit`, `productId`, `customerId` | List of reviews with pagination |
| `/api/reviews` | POST | Create a new review | Auth token, Review data | Created review |
| `/api/reviews` | PUT | Update review | `id`, Review data | Updated review |
| `/api/reviews` | DELETE | Delete review | `id` | Success message |

## App Router Pages

The application also includes modern App Router pages in the `/app` directory:

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Home** | `/` | App router home page | Server components, featured products |
| **Admin Dashboard** | `/admin/dashboard` | Admin dashboard | Admin controls, statistics |
| **Customer Pages** | `/customer/*` | Customer area pages | Account, cart, wishlist |
| **Vendor Pages** | `/vendor/*` | Vendor portal pages | Dashboard, orders, products |

## Feature Reference

> **Legend:** = Implemented | = In Progress | = Planned

### Customer Features

- **Account Management**
  - User registration and login
  - Profile management
  - Address book management
  - Password recovery
  - Order history viewing
  - Wishlist management

- **Shopping Experience**
  - Product browsing and searching
  - Advanced filtering and sorting
  - Product comparisons
  - Product reviews and ratings
  - Related products suggestions
  - Recently viewed products tracking

- **Cart and Checkout**
  - Add to cart functionality
  - Cart management (update quantities, remove items)
  - Save for later functionality
  - Guest checkout option
  - Multiple payment methods
  - Order tracking
  - Order cancellation
  - Reorder functionality

- **Social Features**
  - Product sharing on social media
  - Review submission with photos
  - Refer-a-friend program
  - Community Q&A on products

### Vendor Features

- **Account Management**
  - Vendor registration and login
  - Business profile management
  - Store settings configuration
  - Team member management
  - Commission structure viewing

- **Store Management**
  - Multiple store creation and management
  - Store branding customization
  - Store location management with geospatial features
  - Store hours and contact information
  - Store policies configuration

- **Product Management**
  - Product creation and management
  - Bulk product upload
  - Inventory management
  - Product categorization
  - Product variations (size, color, etc.)
  - Product pricing and discounts
  - Product visibility settings

- **Order Management**
  - Order receiving and processing
  - Order status updates
  - Shipping label generation
  - Order fulfillment tracking
  - Customer communication
  - Returns and refunds processing

- **Analytics and Reporting**
  - Sales analytics dashboard
  - Revenue and earnings tracking
  - Customer insights
  - Product performance metrics
  - Conversion rate analytics
  - Traffic sources analysis

- **Financial Management**
  - Payout tracking
  - Transaction history
  - Tax documentation
  - Commission calculation
  - Payout method configuration

### Admin Features

- **Platform Management**
  - Dashboard with key metrics
  - System health monitoring
  - Platform settings configuration
  - Email template management
  - Content management

- **User Management**
  - Customer account management
  - Vendor account management
  - Admin user management
  - Role and permission management
  - User activity monitoring

- **Catalog Management**
  - Category management
  - Attribute management
  - Product approval workflow
  - Featured products management
  - Bulk product operations

- **Order Management**
  - Order monitoring and management
  - Order dispute resolution
  - Refund processing
  - Order analytics

- **Vendor Management**
  - Vendor approval workflow
  - Vendor performance monitoring
  - Commission management
  - Payout processing
  - Vendor support

- **Content Management**
  - Banner management
  - Promotional content
  - Email campaign management
  - SEO management
  - Static page content

- **System Configuration**
  - Payment gateway configuration
  - Shipping method configuration
  - Tax configuration
  - Currency configuration
  - Language and localization settings

### Technical Features

- **Performance Optimization**
  - Server-side rendering
  - Image optimization
  - Code splitting
  - Caching strategies
  - Database query optimization
  - Lazy loading

- **Search Functionality**
  - Full-text search
  - Autocomplete suggestions
  - Search result filtering
  - Search analytics
  - Relevance ranking

- **Geospatial Features**
  - Store locator with map
  - Proximity-based search
  - Delivery radius calculation
  - Location-based recommendations

- **Security Features**
  - Authentication and authorization
  - Data encryption
  - CSRF protection
  - Rate limiting
  - Input validation
  - Secure payment processing

- **API and Integration**
  - RESTful API architecture
  - Type-safe API client
  - Third-party service integrations
  - Webhook support
  - API documentation

- **Data Management**
  - Database migrations
  - Data validation
  - Error handling
  - Logging and monitoring
  - Backup and recovery

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interfaces
  - Cross-browser compatibility
  - Accessibility compliance
