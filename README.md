# PayBench

A Next.js (App Router) UI scaffold for a payment gateway selection screen —
built in plain JavaScript for learning, so **no actual payment integration
logic is included**.

Gateways covered: PhonePe, Paytm, Razorpay, PayU, Cashfree, Instamojo,
Zaakpay, Stripe, and PayPal.

## What's here

- `app/` — App Router entry: `layout.jsx`, `page.jsx`, `globals.css`. No
  `app/api/*` routes at all.
- `components/checkout/` — the interactive UI:
  - `CheckoutBench.jsx` — top-level client component holding state (amount,
    selected gateway, category filter). Read the `NOTE` comment inside — this
    is where you'll eventually call whichever gateway's SDK.
  - `AmountPicker.jsx` — preset + custom order amount.
  - `CategoryTabs.jsx` — filters gateways by UPI/wallet, aggregator, or global.
  - `GatewayCard.jsx` — one card per gateway, with an expandable "what you'll
    need to wire up" checklist and copy-to-clipboard env var names.
  - `ReceiptPanel.jsx` — sticky order summary styled like a thermal receipt;
    the "Pay" button is a labelled placeholder, not a real charge.
- `data/gateways.js` — descriptive metadata only (name, brand colour,
  suggested env var names, official docs link, setup checklist). No network
  calls, no SDK imports.

## What's intentionally missing

- Any `app/api/*` route handlers.
- Any real SDK calls (`razorpay`, `stripe`, `@paypal/checkout-server-sdk`,
  gateway REST calls, checksum/signature generation, webhook handling, etc.).
- Server-side order creation, verification, or persistence.

Those are left for you to build gateway-by-gateway. Each `GatewayCard`'s
expanded checklist and `data/gateways.js`'s `setupSteps` / `envVars` are meant
as a starting map, not working code.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
