import "./globals.css";

export const metadata = {
  title: "PayBench — Payment gateway integration scaffold",
  description:
    "A UI scaffold for wiring up PhonePe, Razorpay, PayU, Cashfree, Stripe, PayPal, Instamojo, Zaakpay and Paytm checkouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-display text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
