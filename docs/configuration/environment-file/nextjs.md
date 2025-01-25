---
sidebar_position: 0
---

# NextJS

To secure the authentication used by NextAuth, you need an HMAC-SHA512 or HS512 encryption key.

Generate your secret key with the following command:

```bash
npm run --silent nextjs:generate:secret
```

Once you've got your new key, edit the value of `NEXTAUTH_SECRET`.

_Example:_

```properties
NEXTAUTH_SECRET=V+P8sohr9JRtRooeyApVtc8ywDpUStqAdr0aq56eAJhiqflWQjcko2Ihs56/4JiSkFWdeL9GuWY7VgI5RFpEhQ==
```

In order to indicate the domain URL that you use for your website, you need to set the `NEXTAUTH_URL`.

```properties
NEXTAUTH_URL=http://localhost:3000
```

_Example:_

```properties
NEXTAUTH_URL=https://bildap.co
```

Remember that it's important for security of your website to use `https`instead of `http`.&#x20;
