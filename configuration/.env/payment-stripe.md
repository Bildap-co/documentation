# Payment (Stripe)

For payment processing, **Stripe** has been integrated into this project. Please follow the steps below to set it up in no time:

**Test Mode**

1. Visit the [Stripe Test Dashboard](https://dashboard.stripe.com/test/apikeys) to reveal your API secret key for test mode.
2. Copy the `Publishable key` and `Secret key`.
3.  Add these keys to your `.env` file:

    ```env
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_test_publishable_key
    STRIPE_SECRET_KEY=your_test_secret_key
    ```

**Common Test Card**

When you are in test mode, you can make a fake payment by using the following card information in order to validate your payment integration and ensure your business is capable of accepting payments from your customers.

* **Visa**: 4242 4242 4242 4242
  * Exp: Any future date
  * CVC: Any 3 digits

**Live Mode**

1. Visit the [Stripe Live Dashboard](https://dashboard.stripe.com/apikeys) to reveal your API secret key for live mode.
2. Copy the `Publishable key` and `Secret key`.
3.  Add these keys to your `.env` file:

    ```env
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_live_publishable_key
    STRIPE_SECRET_KEY=your_live_secret_key
    ```

Make sure to replace `your_test_publishable_key`, `your_test_secret_key`, `your_live_publishable_key`, and `your_live_secret_key` with the actual keys from your Stripe account.
