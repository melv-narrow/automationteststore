# Test Directory Structure

```
/tests
├── auth/                     # Authentication related tests
│   ├── login.spec.ts        # Login tests
│   └── registration.spec.ts  # Registration tests
│
├── cart/                     # Shopping cart related tests
│   ├── add-to-cart.spec.ts  # Adding items tests
│   └── checkout.spec.ts     # Checkout process tests
│
├── product/                  # Product related tests
│   ├── search.spec.ts       # Product search tests
│   └── details.spec.ts      # Product details page tests
│
├── account/                  # Account management tests
│   ├── profile.spec.ts      # Profile management tests
│   └── orders.spec.ts       # Order history tests
│
└── utils/                   # Test utilities and helpers
    ├── test-data.ts        # Test data management
    └── helpers.ts          # Common helper functions
```

## Directory Descriptions

### /auth
Tests related to user authentication, including login, registration, password reset, etc.

### /cart
Tests covering shopping cart functionality, adding/removing items, and the checkout process.

### /product
Tests for product-related features like searching, filtering, and viewing product details.

### /account
Tests for account management features like updating profile, viewing orders, etc.

### /utils
Helper functions and test data management that can be reused across different test files.
