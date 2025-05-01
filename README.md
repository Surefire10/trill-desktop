#  🎸  Guitar Chord Dashboard (Frontend)

A sleek guitar chord dashboard built with **Next.js 15**. This frontend connects to the NestJS backend and allows users to:

-  Lookup guitar chords by submitting fret and finger data.
-  Browse a full visual chord library.
-  Responsive, fast, and modern interface powered by the App Router.


##  Features

-  **Chord Fretboard Lookup UI**: Users can input frets/fingers and view matching chords visually.
-  **Chord Library View**: Scroll through a clean view of all chords.

---

##  Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org)
- **Styling:** Tailwind CSS
- **Routing:** App Directory (file-based routing)
- **Data Fetching:** Fetch API
- **Deployment:** Vercel-ready

---
---

## ⚠️ Security Note: Middleware in Next.js 15

Next.js 15 introduces new features for middleware — but **you should be aware**:

> 🔒 **Middleware runs on the Edge** and is shared across all users — avoid placing any **user-sensitive logic**, **auth tokens**, or private headers inside middleware code.

If you’re using middleware for routing or auth checks, keep in mind:
- It **cannot access request bodies**.
- It **does not run in a secure, per-user context**.
- It should **never perform sensitive server logic** — use Server Actions or API routes for that.

👉 Learn more: [Next.js Middleware Caveats](https://nextjs.org/docs/app/building-your-application/routing/middleware#caveats)

---


