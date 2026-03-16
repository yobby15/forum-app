# Dicoding Forum App 🗣️

Aplikasi forum diskusi yang dibangun dengan React, Redux Toolkit, dan Tailwind CSS.

---

## 🚀 Tech Stack

- **React 19** — UI library
- **Redux Toolkit** — State management
- **React Router v7** — Client-side routing
- **Tailwind CSS v4** — Styling
- **Vite** — Build tool
- **Vitest** — Unit & Integration testing
- **Cypress** — End-to-End testing
- **Storybook** — Component documentation (React Ecosystem)

---

## ✨ Fitur Aplikasi

- 🔐 Login & Register akun
- 📋 Melihat daftar thread diskusi
- 🔍 Filter thread berdasarkan kategori
- ➕ Membuat thread baru
- 💬 Melihat detail thread & komentar
- 👍 Vote up/down pada thread
- 🏆 Melihat leaderboard pengguna aktif

---

## 📦 Instalasi & Menjalankan

\`\`\`bash
npm install
npm run dev
npm run build
npm run preview
\`\`\`

---

## 🧪 Testing

\`\`\`bash
# Unit & integration tests
npm test

# E2E tests (build dahulu)
npm run build && npm run e2e

# Buka Cypress interaktif
npm run e2e:open
\`\`\`

### Ringkasan Test

| File | Jenis | Jumlah Test |
|------|-------|-------------|
| threadsReducer.test.js | Unit - Reducer | 6 tests |
| threadDetailReducer.test.js | Unit - Reducer | 7 tests |
| asyncThread.test.js | Integration - Thunk | 8 tests |
| asyncSetAuthUser.test.js | Integration - Thunk | 8 tests |
| LoginForm.test.jsx | Unit - Component | 8 tests |
| ThreadItem.test.jsx | Unit - Component | 9 tests |
| login.cy.js | E2E | 6 tests |
| **Total** | | **52 tests** |

---

## 📖 Storybook

\`\`\`bash
npm run storybook
\`\`\`

Stories tersedia untuk:
- **ThreadItem** — 5 stories
- **LeaderboardItem** — 5 stories

---

## 🔄 CI/CD

- **Continuous Integration**: GitHub Actions
- **Continuous Deployment**: Vercel

Branch master diproteksi: require 1 approving review + CI harus lulus.

---

## 🌐 URL Deployment

> Lampirkan URL Vercel Anda setelah deployment selesai.
