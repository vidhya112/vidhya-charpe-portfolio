# Vidhya Charpe — Cinematic Interactive Developer Portfolio

> **“A Day in the Life of a Frontend Engineer — from the first line of code in the morning to shipping a production-ready feature at night.”**

A premium, cinematic personal portfolio website for **Vidhya Charpe**, Software Engineer & React Frontend Engineer with 4+ years of professional experience.

---

## 🌟 Narrative Flow

Instead of traditional static sections, the portfolio takes visitors on an interactive journey:

1. **09:00 AM • MORNING** — Cinematic dark space hero with text morphing & floating interactive tech chips.
2. **09:12 AM • THE FIRST COMMIT** — Animated terminal with `$ git status`, `$ npm run dev`, and live stack hydration.
3. **09:30 AM • WHO IS BEHIND THE CODE** — Split-screen engineering story with source-backed performance metrics (4+ YOE, 45% load improvement, 85%+ code coverage, 12+ features, 20% velocity).
4. **10:00 AM • THE JOURNEY** — Illuminated scroll-driven timeline from CDAC PG-DAC to Cybage Software (Jan 2022 – Present).
5. **10:45 AM • ENTER THE CODEBASE** — Interactive `vidhya.dev` code sandbox with syntax-highlighted React & TypeScript files.
6. **11:30 AM • MY TOOLBOX** — Categorized engineering arsenal with live search, filters, and skill inspection.
7. **01:30 PM • HOW I BUILD** — 7-Stage pipeline: `Understand ➔ Architect ➔ Build ➔ Integrate ➔ Test ➔ Optimize ➔ Ship`.
8. **02:30 PM • THINGS I'VE BUILT** — Cinematic showcase featuring the **Netflix Experience** (`https://vidhya112.github.io/Netflix_App/`), **Tango Care Healthcare Platform**, and **Marco Technologies Platform**.
9. **03:30 PM • THE PERFORMANCE LAB** — Live speedometer & before/after toggle demonstrating 45% page-load improvements.
10. **04:30 PM • TRUST THE CODE** — Simulated test runner ($ npm test) & 85%+ coverage ring with Jest & React Testing Library.
11. **05:00 PM • AI × ENGINEERING** — Claude + Copilot + Human Judgment matrix.
12. **05:30 PM • ONE DAY IN MY CODE** — 10-step illustrative timeline of a frontend engineer's day.
13. **06:00 PM • SOMETHING BROKE** — Interactive mini-debugger game (diagnose memory leak race condition ➔ deploy fix).
14. **06:30 PM • ENGINEERING MINDSET** — Large editorial typography on architecture, DX, UX, and maintainability.
15. **07:00 PM • BEYOND THE JOB** — Side projects and continuous learning explorations.
16. **07:30 PM • WANT THE FULL STORY?** — Resume card with interactive preview and PDF download.
17. **08:00 PM • DRAMATIC TRANSITION** — Pitch-black emotional bridge ("There's always something new to build.").
18. **08:30 PM • CONTACT & FREELANCING** — Validated contact form with anti-spam honeypot, Firestore persistence, and Buy Me a Coffee integration.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript (Strict Mode), Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti.
- **Backend & Cloud**: Firebase (Firestore, Cloud Functions for Node 20 / TypeScript, Firebase Analytics, Firebase Auth, Security Rules, Firebase Hosting).
- **Testing & Quality**: Vitest, React Testing Library, ESLint, TypeScript compiler.
- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy.yml`).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Quality Gates & Tests
```bash
# Typecheck TypeScript
npm run typecheck

# Run Unit Tests
npm run test

# Build Production Bundle
npm run build
```

---

## ⚡ Developer Easter Eggs & Shortcuts

- **`Ctrl + K` or `Cmd + K`**: Opens the Command Palette for instant navigation, resume download, and quick actions.
- **Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`)**: Activates secret engineer overclocked mode with celebratory confetti.
- **Coffee Counter**: Click the coffee cup in the contact section multiple times to trigger the critical caffeine monitor.

---

## 🔥 Firebase & Cloud Architecture

### Firestore Collections
- `contacts/`: Stores validated, sanitized incoming contact form submissions.
- `visits/`: Records anonymous visitor sessions.
- `events/`: Telemetry events (e.g. project views, demo clicks, resume downloads).

### Security Rules (`firestore.rules`)
- Public visitors can write valid, sanitized contact submissions.
- Public read access to contacts and analytics is restricted.
- Authenticated admin (Vidhya) has full read access to `/admin` telemetry and leads.

### Deploying to Firebase
```bash
# Login to Firebase
npx firebase-tools login

# Deploy all services (Hosting, Functions, Firestore Rules)
npx firebase-tools deploy
```

---

## 📄 License
© 2026 Vidhya Charpe. Built with curiosity, coffee & too many commits.
