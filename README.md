# Derek

A simple app for creating and organizing sports sessions

## Motivation

Recently, I started playing volleyball and found a group that organized sessions just for fun, the solution for booking your slot was done by copy and pasting a big pile of text, adding your name to the team and position you want and then pasting it back into the chat, when the session is first announced there is mayhem so we need something better.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting started

Make sure you have the following tools installed:

- [PNPM](https://pnpm.io/) - Package manager
- [VSCode](https://code.visualstudio.com/) - Code editor

For auth we are using [Clerk](https://clerk.com/), you will need to create an account and get your API keys.
You will need to enable email/password and google sign in and then add the username and name options to the user.

For the database we are using [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), you can follow along with the [quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart#quickstart) to create your own free database and get the POSTGRES_URL env var which will replace the `DB_URL` in your `.env.local` file.

Fork and clone the repo and install the dependencies:

```bash
pnpm i
```

Create a `.env.local` file in the root of the project and add your environment variables:

```bash
cp .env.example .env.local
```

## Development

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Clerk Documentation](https://docs.clerk.dev/) - learn about Clerk features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
