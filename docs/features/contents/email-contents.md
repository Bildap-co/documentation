---
sidebar_position: 1
---

# Email Contents

In this page you can update the contents that are being used for transactional email communications.

![Admin > Email Contents Page](</assets/image (3).png>)

There are variables that you can use in order to define dynamic values on your template.

Here is the list of the available variables you can use:

| Variable                     | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| $\[user.id]                  | The unique identifier for the user.                     |
| $\[user.email]               | The email address of the user.                          |
| $\[user.firstname]           | The first name of the user.                             |
| $\[user.lastname]            | The last name of the user.                              |
| $\[user.verificationPinCode] | The Verification Pincode at the moment of registration. |
| $\[user.forgotPasswordToken] | The token for forgot password process.                  |
| $\[user.createdAt]           | The date and time when the user account was created.    |
| $\[sale.product.name]        | The name of the product sold.                           |
| $\[sale.id]                  | The unique identifier for the sale.                     |
| $\[sale.quantity]            | The quantity of the product sold.                       |
| $\[sale.currency]            | The currency used for the sale.                         |
| $\[sale.price]               | The price of the product sold.                          |
| $\[sale.createdAt]           | The date and time when the sale was created.            |
| $\[release.product.name]     | The name of the product.                                |
| $\[release.version]          | The version number of the product release.              |
| $\[release.notes]            | The release notes for the new version.                  |
| $\[release.date]             | The date and time when the release was published.       |

**Important:** Please note that availability of these variables depends on the events that triggers them.
