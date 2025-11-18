# i18n (Internationalization) Setup

## Overview
This application uses **i18next** and **react-i18next** for internationalization with support for three languages:
- 🇺🇸 English (en)
- 🇫🇷 French (fr)
- 🇸🇦 Arabic (ar)

## Installation
Already installed packages:
- `i18next` - Core i18n framework
- `react-i18next` - React bindings for i18next
- `i18next-browser-languagedetector` - Automatic language detection

## Configuration
The i18n configuration is located in `/src/i18n/config.ts` and includes:
- Translation resources for all three languages
- Automatic language detection
- localStorage caching
- RTL support for Arabic

## Usage in Components

### Basic Translation
```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('products.title')}</h1>
      <button>{t('products.addToCart')}</button>
    </div>
  );
}
```

### Using with Language Selector
The language selector in the Footer automatically syncs with i18n:

```typescript
import { useSettingsStore, languages } from '@/store/settingsStore';

function LanguageSelector() {
  const { language, setLanguage } = useSettingsStore();
  
  return (
    <select 
      value={language.code} 
      onChange={(e) => {
        const newLang = languages.find(l => l.code === e.target.value);
        if (newLang) setLanguage(newLang);
      }}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
```

## Translation Keys Structure

### Header
- `search` - Search button
- `account` - Account button
- `cart` - Shopping cart
- `menu` - Menu button

### Footer
- `newsletter.placeholder` - Newsletter input placeholder
- `newsletter.subscribe` - Subscribe button
- `footerSections.shop` - Shop section title
- `footerSections.information` - Information section title
- `footerSections.company` - Company section title
- `footerLinks.*` - All footer links

### Products
- `products.title` - Products page title
- `products.addToCart` - Add to cart button
- `products.viewDetails` - View details link
- `products.outOfStock` - Out of stock message
- `products.price` - Price label
- `products.quantity` - Quantity label

### Cart
- `cartPage.title` - Cart page title
- `cartPage.empty` - Empty cart message
- `cartPage.total` - Total label
- `cartPage.checkout` - Checkout button
- `cartPage.continueShopping` - Continue shopping link

### Common
- `common.loading` - Loading message
- `common.error` - Error message
- `common.retry` - Retry button
- `common.cancel` - Cancel button
- `common.save` - Save button
- `common.delete` - Delete button
- `common.edit` - Edit button

## Adding New Translations

### 1. Add to Translation Resources
Edit `/src/i18n/config.ts`:

```typescript
const resources = {
  en: {
    translation: {
      myNewKey: 'My English Text',
      nested: {
        key: 'Nested value',
      },
    },
  },
  fr: {
    translation: {
      myNewKey: 'Mon Texte Français',
      nested: {
        key: 'Valeur imbriquée',
      },
    },
  },
  ar: {
    translation: {
      myNewKey: 'النص العربي',
      nested: {
        key: 'قيمة متداخلة',
      },
    },
  },
};
```

### 2. Use in Components
```typescript
const { t } = useTranslation();
<p>{t('myNewKey')}</p>
<p>{t('nested.key')}</p>
```

## RTL (Right-to-Left) Support

Arabic automatically switches to RTL mode. The document direction is updated in the `settingsStore` when the language changes:

```typescript
document.documentElement.dir = language.code === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = language.code;
```

### CSS for RTL
Add RTL-specific styles in your CSS:

```css
[dir="rtl"] .my-element {
  text-align: right;
  margin-left: 0;
  margin-right: auto;
}
```

## Interpolation
For dynamic values in translations:

```typescript
// In config.ts
welcome: 'Welcome, {{name}}!'

// In component
t('welcome', { name: 'John' })
// Output: "Welcome, John!"
```

## Pluralization
```typescript
// In config.ts
items: 'item',
items_plural: 'items',

// In component
t('items', { count: 1 }) // "item"
t('items', { count: 5 }) // "items"
```

## Language Detection Priority
1. **localStorage** - Previously selected language
2. **Navigator** - Browser language
3. **HTML tag** - Document language attribute

## Best Practices

1. **Always use translation keys** - Never hardcode text in multiple languages
2. **Keep keys organized** - Use nested keys for related translations
3. **Provide fallbacks** - English is the fallback language
4. **Test RTL layouts** - Always test Arabic language for proper RTL rendering
5. **Consistent naming** - Use clear, descriptive key names

## Integration with Zustand Store

The settings store (`useSettingsStore`) automatically syncs with i18n:
- Changing language in the store updates i18n
- Document direction is updated for RTL
- Language preference is persisted in localStorage

```typescript
const { language, setLanguage } = useSettingsStore();

// This will:
// 1. Update Zustand store
// 2. Change i18n language
// 3. Update document direction
// 4. Save to localStorage
setLanguage({ code: 'ar', name: 'Arabic', flag: '🇸🇦' });
```

## Example Component

```typescript
import { useTranslation } from '@/hooks/useTranslation';
import { useSettingsStore } from '@/store/settingsStore';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const { currency } = useSettingsStore();
  
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{t('products.price')}: {product.price} {currency}</p>
      <button>{t('products.addToCart')}</button>
    </div>
  );
}
```
