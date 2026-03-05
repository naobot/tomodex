# Tomodex

A personal rolodex and scrapbook for organising information about friends. Think of it as a warm, private contacts app — store addresses, birthdays, notes, and anything else you want to remember about the people in your life.

Built with Next.js, Prisma, and Supabase. Designed to be self-hostable and extensible.

---

## Features

- **Friends list** — searchable, sortable list of all your contacts
- **Person detail pages** — per-person record with contact info, location, mailing addresses, notes, and custom attributes
- **Birthdays** — dedicated view for upcoming and recent birthdays
- **Private by default** — all data is scoped to the logged-in user; no sharing or social features
- **Google OAuth** — sign in with your Google account

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| ORM | Prisma 7 |
| Database | PostgreSQL via Supabase |
| Auth | NextAuth v5 (Google OAuth) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20+ (project uses v24, see `.nvmrc`)
- A [Supabase](https://supabase.com/) account (free tier is fine)
- A [Google Cloud](https://console.cloud.google.com/) project with OAuth credentials

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/naobot/tomodex.git
cd tomodex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

The required variables are:

```env
# Supabase — find these in your Supabase project settings under Database > Connection string
DATABASE_URL=postgresql://...

# NextAuth
AUTH_SECRET=                  # Generate with: npx auth secret
AUTH_GOOGLE_ID=               # From Google Cloud Console > APIs & Services > Credentials
AUTH_GOOGLE_SECRET=           # From Google Cloud Console > APIs & Services > Credentials
NEXTAUTH_URL=http://localhost:3000
```

### 4. Push the schema to your database

```bash
npx prisma db push
```

This creates all the tables in your Supabase database. Re-run this any time `prisma/schema.prisma` changes.

### 5. Generate the Prisma client

```bash
npx prisma generate
```

This generates TypeScript types from your schema into `generated/prisma/`. Re-run this after any schema change.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with Google.

---

## Project Structure

```
app/
├── page.tsx              # Home page (conditional UI for logged-in/out)
├── HomeCard.tsx          # Home page client component
├── HomeCard.module.css   # Home page styles
├── globals.css           # Global styles and design tokens
├── layout.tsx            # Root layout
├── login/                # Login page
└── people/
    ├── page.tsx          # Friends list
    ├── PersonList.tsx
    ├── actions.ts
    └── [id]/             # Person detail page
        ├── page.tsx
        ├── PersonDetail.tsx
        ├── ContactSection.tsx
        ├── LocationSection.tsx
        ├── MailingAddressSection.tsx
        ├── NotesSection.tsx
        ├── CustomAttrSection.tsx
        ├── actions.ts
        └── types.ts

lib/
├── prisma.ts             # Prisma singleton
└── tokens.ts             # Design tokens (JS mirror of globals.css)

prisma/
└── schema.prisma         # Database schema

generated/
└── prisma/               # Auto-generated Prisma client (do not edit)
```

---

## Development Notes

- **Schema changes** — edit `prisma/schema.prisma`, then run `prisma db push` and `prisma generate`
- **Prisma config** — lives in `prisma.config.ts`; the client is output to `generated/prisma/` and requires the `PrismaPg` adapter
- **Auth** — session strategy is JWT; `session.user.id` is the internal Prisma `User.id` injected via callbacks in `auth.ts`
- **Route protection** — `proxy.ts` guards all routes except `/`, `/login`, and Next.js internals
- **Data ownership** — every query must be scoped by `ownerId`. Never query without it
- **CSS** — Tailwind for layout and utility classes; CSS Modules for bespoke component styles; design tokens defined in `globals.css`

---

## Contributing

Contributions are welcome! A few guidelines:

- Follow the existing file and component naming conventions (PascalCase components, kebab-case routes)
- All new database tables should include an `ownerId` column scoped to the `User` model
- Server Actions live in `actions.ts` colocated with their route, not in a global actions file
- Run `npx prisma generate` after any schema change before opening a PR

---

## License

MIT