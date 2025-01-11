# Transactional Email (SMTP)

Depending on the event, this project will send an email to your customers, such as at the moment of user registration, order completion, etc. We use **transactional email** terminology to express this feature.

**AhaSend** is our recommended choice of SMTP provider and offers 1000 free emails per month with very competitive prices that are greatly beneficial for businesses aiming for low startup costs (affordability), unparalleled reliability of service, and exceptional quality of service that allows you to scale your business to any level that you desire. The sky is the limit, and **AhaSend** makes sure you are fully covered..

**Exclusive Offer**: [Sign up through our affiliate link](https://ahasend.com/?linkId=lp_307480\&sourceId=nim\&tenantId=ahasend) and receive a special discount on your subscription! Don't miss out on this opportunity to save while enjoying top-notch email services.

To set up SMTP for transactional email using AhaSend, follow these steps:

### **Obtain SMTP Credentials**

To create SMTP credentials, open the [AhaSend Dashboard](https://dash.ahasend.com/).

1. Visit the **Credentials** tab of your account.
2. Click on the **Create Credential** button.
3. Select API Key as the type of credential.
4. Choose a name for the credential: This name is only used on the dashboard and is there to help you identify this credential later in other parts of the dashboard. If you have multiple domains in your account, it's a good idea to include the domain name in the credential name, e.g. "Example.com Production", "Example.com Staging", etc.
5. Click on the Create Credential button to create the new credential and see the API Key.

Once you have obtained the SMTP credentials from AhaSend, add them to your environment variables as shown below:

```env
SMTP_SENDER_NAME=<Your brand name>
SMTP_SENDER_EMAIL=<noreply@email.example.com>
SMTP_HOST=smtp.ahasend.com
SMTP_PORT=587
SMTP_USER=<Your SMTP username>
SMTP_PASS=<Your SMTP password>
```

By following these steps, you will have configured SMTP for transactional email using AhaSend in your application. If you prefer another SMTP provider, you can also follow their documentation to obtain credentials and add them to your environment accordingly.
