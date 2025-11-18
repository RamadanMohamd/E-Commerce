# E-Commerce Application

A high-performance React e-commerce application built with Vite, TypeScript, and Tailwind CSS.

## Performance & Accessibility

![Lighthouse Score]

- 🚀 Performance: 95/100
- ♿ Accessibility: 100/100
- ✅ Best Practices: 100/100
- 🎯 SEO: 91/100

## Prerequisites

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.easy-orders.net/api/v1
```

See `.env.example` for all available environment variables.

## Installation

```bash
npm install --legacy-peer-deps
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Testing

Run tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Production

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run serve
```

The preview server runs at `http://localhost:4173`

## Features

- **Multi-language Support**: English, French, and Arabic
- **RTL Support**: Full right-to-left layout for Arabic language
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Performance Optimizations

This application includes:
- WebP image optimization (94% size reduction)
- Brotli/Gzip compression (72% reduction)
- Code splitting and lazy loading
- LCP optimization (75% improvement)
- Tree-shaking for minimal bundle size

## Project Structure

```
src/
├── assets/         # Images and static files
├── components/     # React components
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization
├── locales/        # Translation files
├── pages/          # Page components
├── store/          # State management (Zustand)
├── styles/         # Global styles
└── types/          # TypeScript types
```
