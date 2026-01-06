# Park & Find

A minimal, privacy-first Progressive Web App (PWA) that helps you remember where you parked your car. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Mark your parking location with a single tap
- View your current location and parked car location on a map
- Navigate back to your car via external maps apps
- Fully offline-capable after initial load
- All data stored locally on your device
- Installable as a Progressive Web App

## Prerequisites

- **Node.js**: Version 22.20.0 (see `.nvmrc`)
- **npm**: Comes with Node.js

### Using nvm (Recommended)

If you use `nvm` (Node Version Manager), the project includes an `.nvmrc` file:

```bash
nvm use
```

This will automatically switch to Node.js 22.20.0.

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/noamoss/locationing.git
cd locationing
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI

## Project Structure

```
locationing/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
├── hooks/                 # Custom React hooks
├── services/              # Service layer utilities
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── public/                # Static assets
├── e2e/                   # End-to-end tests
├── __tests__/             # Unit tests
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

### Directory Descriptions

- **`app/`** - Next.js App Router directory containing pages, layouts, and route handlers
- **`components/`** - Reusable React components
- **`hooks/`** - Custom React hooks for shared logic
- **`services/`** - Service layer for business logic and external API interactions
- **`types/`** - TypeScript type definitions and interfaces
- **`utils/`** - Utility functions and helpers
- **`public/`** - Static files served at the root URL
- **`e2e/`** - End-to-end tests using Playwright
- **`__tests__/`** - Unit and integration tests using Jest

## Technology Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode enabled)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: 
  - [Jest](https://jestjs.io/) for unit tests
  - [Playwright](https://playwright.dev/) for E2E tests
- **Maps**: [MapLibre GL](https://maplibre.org/) for map rendering
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa) for Progressive Web App support

## Node.js Version

This project requires **Node.js 22.20.0**. The version is specified in `.nvmrc` for easy management with `nvm`.

To verify your Node.js version:
```bash
node --version
```

If you need to switch versions:
```bash
nvm use
```

## Development Guidelines

### TypeScript

- TypeScript strict mode is enabled
- All files should have proper type annotations
- Run `npm run type-check` before committing

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Global styles are in `app/globals.css`

### Testing

- Write unit tests for utility functions and components
- Write E2E tests for critical user flows
- Aim for good test coverage

### Code Quality

- Run `npm run lint` before committing
- Follow the existing code style
- Use meaningful variable and function names

## License

Private project - All rights reserved

## Contributing

This is a private project. For questions or issues, please contact the repository owner.

