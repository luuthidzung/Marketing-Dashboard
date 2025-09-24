# Affiliate Marketing Dashboard

A responsive web application for affiliate marketing management, built with Next.js, TypeScript, TailwindCSS, and Shadcn UI. This project demonstrates frontend development skills for an interview at MIC ACE.

## Features

- **Dashboard Overview**: Display KPIs, charts, and performance metrics
- **Affiliate Management**: DataTable with filtering, sorting, and search
- **Campaign Management**: Track marketing campaign performance
- **Multilingual Support**: English and Vietnamese language options
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Mock API Integration**: Simulated backend with Next.js API routes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **State Management**: Context API + React Query
- **Internationalization**: react-i18next
- **Data Visualization**: Recharts
- **API Integration**: Axios + React Query

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/affiliate-marketing-dashboard.git
cd affiliate-marketing-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/src
  /app                 # Next.js App Router
    /api               # Mock API routes
    /affiliates        # Affiliates page
    /campaigns         # Campaigns page
    /settings          # Settings page
  /components          # Reusable components
    /ui                # UI components from Shadcn
    /dashboard         # Dashboard-specific components
    /affiliates        # Affiliate-specific components
    /campaigns         # Campaign-specific components
    /layout            # Layout components
  /context             # React Context for global state
  /hooks               # Custom React hooks
  /lib                 # Utility functions and types
    /i18n              # Internationalization setup
      /locales         # Translation files
  /public              # Static assets
```

## Key Features

### Dashboard Overview
- KPI cards showing total referrals, earnings, conversion rate
- Commission trends chart using Recharts
- Recent activity feed
- Top affiliates list
- Campaign performance metrics

### Affiliate Management
- Searchable and sortable data table
- Filter by status (active, inactive, pending)
- Responsive design for all screen sizes

### Campaign Management
- Track campaign performance metrics
- Filter and sort campaigns
- View conversion rates and revenue

### Internationalization (i18n)
- Support for English and Vietnamese
- Language switcher in header
- Translation files for all UI elements

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Collapsible sidebar for mobile devices

## License

This project is for demonstration purposes only.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)
- [react-i18next](https://react.i18next.com/)

