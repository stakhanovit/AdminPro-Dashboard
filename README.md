
# AdminPro Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-4.21.2-green?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.17-blue?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Vite-5.4.19-yellow?style=for-the-badge&logo=vite" alt="Vite">
</div>

<div align="center">
  <h3>Professional Full-Stack Admin Dashboard Template</h3>
  <p>A complete admin dashboard solution built with modern technologies featuring user management, product management, analytics, and authentication.</p>
</div>

## Features

### Authentication & Security
- **Secure Login System** - Email/password authentication with session management
- **Protected Routes** - Route-level authentication guards
- **Role-Based Access** - User roles (admin, user) with status management
- **Session Persistence** - Automatic login state persistence

### Dashboard & Analytics
- **Real-time Analytics** - Interactive charts and data visualization
- **Revenue Tracking** - Monthly revenue charts with user metrics
- **Traffic Analysis** - User growth and traffic monitoring
- **Performance Stats** - Key metrics dashboard with real-time updates

### User Management
- **User CRUD Operations** - Complete user management system
- **User Profiles** - Detailed user information and avatars
- **Status Management** - Active/inactive user status control
- **Search & Filtering** - Advanced user search capabilities

### Product Management
- **Product Catalog** - Complete product management system
- **Inventory Tracking** - Stock levels and product status
- **Product Categories** - Organized product categorization
- **Bulk Operations** - Multiple product actions

### UI/UX Features
- **Dark/Light Mode** - Complete theme switching system
- **Responsive Design** - Mobile-first responsive layout
- **Modern Components** - Built with Radix UI and shadcn/ui
- **Accessible** - WCAG compliant accessible components
- **Interactive Charts** - Beautiful data visualization with Recharts

## Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19 with HMR
- **Routing**: Wouter (lightweight client-side routing)
- **UI Library**: shadcn/ui + Radix UI primitives
- **Styling**: TailwindCSS 3.4.17 with CSS custom properties
- **State Management**: React Query + React Context
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 4.21.2
- **Database**: PostgreSQL with Neon Database
- **ORM**: Drizzle ORM with migrations
- **Session Store**: PostgreSQL session storage
- **Validation**: Zod schemas (shared between frontend/backend)

### Development Tools
- **Package Manager**: npm
- **Type Checking**: TypeScript 5.6.3
- **Code Quality**: ESLint + Prettier
- **Development**: Hot Module Replacement
- **Build**: Vite with TypeScript compilation

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**: Useful React snippets
- **TypeScript Importer**: Auto import TypeScript modules
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **Auto Rename Tag**: Automatically rename paired HTML/JSX tags
- **Prettier - Code formatter**: Code formatting
- **ESLint**: JavaScript linting

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Visual Studio Code
- PostgreSQL database (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/adminpro-dashboard.git
   cd adminpro-dashboard
   ```

2. **Open in Visual Studio Code**
   ```bash
   code .
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Run database migrations** (if using PostgreSQL)
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5000`

### Default Login Credentials
- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
adminpro-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── charts/     # Chart components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite development integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Zod validation schemas
└── package.json           # Dependencies and scripts
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run check        # Type checking
npm run db:push      # Push database schema changes

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Apply database schema changes
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Analytics
- `GET /api/analytics/stats` - Get dashboard statistics
- `GET /api/analytics/revenue` - Get revenue data

## Customization

### Theme Customization
The application supports full theme customization through CSS custom properties in `tailwind.config.ts`:

```typescript
// Customize colors, fonts, and animations
theme: {
  extend: {
    colors: {
      // Your custom color palette
    },
    fontFamily: {
      // Your custom fonts
    }
  }
}
```

### Component Customization
All UI components are built with shadcn/ui and can be easily customized in the `components/ui/` directory.

## Deployment

### Deploy to Production
This project can be deployed to various hosting platforms:

**Environment Variables Required:**
```bash
NODE_ENV=production
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
PORT=5000
```

**Build Commands:**
```bash
npm run build
npm run start
```

### Popular Hosting Options
- **Vercel**: Perfect for full-stack applications
- **Netlify**: Great for static deployments
- **Railway**: Simple deployment with database support
- **Heroku**: Classic platform-as-a-service option

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Recharts](https://recharts.org/) - React charting library
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM

---

<div align="center">
  <p>Made with care for the developer community</p>
  <p>Star this repo if you find it helpful!</p>
</div>
