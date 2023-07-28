---
sidebar_position: 1
title: Set User
---

# Set User

---

You can set the user of your application with this method. This method will be used to identify the user of your application. This feature is crucial for the **User Analytics** feature.

Example:

```ts title="login.ts"
...

function login(){
  // some login logic
  
  // highlight-next-line
  nexys.configure((config) => config.setUser(user.email));

  // other logic
}

...
```

This feature will not store any data on **localStorage**. It will only be used to identify the user of your application.

You might want to do this on each page load. Since if not set while logPool is sending to the dashboard, it will be sent as `undefined`.

```ts title="pages/_app.tsx"
...

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // highlight-next-line
    nexys.configure((config) => config.setUser(user.email));
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

...
```