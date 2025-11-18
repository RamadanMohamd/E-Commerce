# Header Component Documentation

## Overview
The Header component is a fully responsive, theme-aware navigation component built with TypeScript and React. It supports dark mode, mobile navigation, user authentication, and shopping cart functionality.

## Features
- ✅ **Fully TypeScript** - All components have proper type definitions
- ✅ **Theme Support** - Light/Dark mode with theme context
- ✅ **Responsive** - Mobile-friendly with hamburger menu
- ✅ **Sticky Header** - Stays at top on scroll
- ✅ **Reusable Components** - Modular architecture
- ✅ **Accessible** - ARIA labels and keyboard navigation
- ✅ **Testable** - Clean separation of concerns

## Component Structure

```
Header/
├── Header.tsx              # Main header component
├── SearchBar.tsx          # Search input with icon
├── CartButton.tsx         # Cart with badge count
├── UserMenu.tsx           # User dropdown menu
├── Navigation.tsx         # Desktop navigation
├── MobileMenu.tsx         # Mobile slide-out menu
└── index.ts               # Exports
```

## Usage

### Basic Usage
```tsx
import Header from './components/Header';

function App() {
  return (
    <Header 
      cartItemCount={3}
      isAuthenticated={false}
    />
  );
}
```

### With All Props
```tsx
<Header
  cartItemCount={5}
  isAuthenticated={true}
  userName="John Doe"
  onLogin={() => console.log('Login clicked')}
  onLogout={() => console.log('Logout clicked')}
  onSearch={(query) => console.log('Search:', query)}
/>
```

## Props

### HeaderProps
```typescript
interface HeaderProps {
  cartItemCount?: number;       // Number of items in cart
  isAuthenticated?: boolean;    // User auth status
  userName?: string;            // Display name of user
  onLogin?: () => void;         // Login callback
  onLogout?: () => void;        // Logout callback
  onSearch?: (query: string) => void; // Search callback
}
```

## Subcomponents

### SearchBar
```tsx
<SearchBar 
  onSearch={(query) => console.log(query)}
  placeholder="Search products..."
/>
```

### CartButton
```tsx
<CartButton 
  itemCount={5}
  onClick={() => console.log('Cart clicked')}
/>
```

### UserMenu
```tsx
<UserMenu
  isAuthenticated={true}
  userName="John Doe"
  onLogin={() => {}}
  onLogout={() => {}}
/>
```

### Navigation
```tsx
<Navigation items={[
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop', badge: 5 }
]} />
```

## Theme Support

The Header automatically adapts to the current theme using the `useTheme` hook:

```tsx
import { useTheme } from './theme/ThemeContext';

const { theme, themeName, toggleTheme } = useTheme();
```

### Theme Toggle Button
Built-in theme toggle button with sun/moon icons.

## Mobile Responsiveness

- **Desktop (lg+)**: Full navigation visible
- **Tablet (md-lg)**: Search bar visible, navigation hidden
- **Mobile (<md)**: Hamburger menu, search below header

## Styling

All components use Tailwind CSS with dark mode support:
- Light mode: `bg-white text-gray-900`
- Dark mode: `dark:bg-gray-900 dark:text-gray-100`

## Testing

Each component has data-testid attributes for easy testing:

```tsx
// Example test
import { render, screen } from '@testing-library/react';

test('renders header', () => {
  render(<Header />);
  expect(screen.getByTestId('header')).toBeInTheDocument();
});
```

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation support
- Focus management in dropdowns
- Screen reader friendly

## Customization

### Adding New Navigation Items
Edit the `navigationItems` array in `Header.tsx`:

```tsx
const navigationItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'New Item', path: '/new', badge: 2 },
];
```

### Changing Colors
Modify the theme in `src/theme/themes.ts`:

```tsx
export const lightTheme: Theme = {
  colors: {
    primary: '#your-color',
    // ...
  }
};
```

## Best Practices

1. **Always wrap with ThemeProvider**:
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

2. **Use TypeScript interfaces**:
```tsx
const props: HeaderProps = {
  cartItemCount: 5
};
```

3. **Handle callbacks**:
```tsx
<Header 
  onSearch={handleSearch}
  onLogin={handleLogin}
/>
```

## Future Enhancements

- [ ] Add notifications dropdown
- [ ] Add language switcher
- [ ] Add mega menu for categories
- [ ] Add search suggestions
- [ ] Add recent searches
- [ ] Add voice search
