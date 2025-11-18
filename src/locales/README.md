# Locales Directory

This directory contains translation files for internationalization (i18n).

## Structure

```
locales/
├── en/
│   └── translation.json    # English translations
├── fr/
│   └── translation.json    # French translations
├── ar/
│   └── translation.json    # Arabic translations
└── index.ts                # Barrel export file
```

## Supported Languages

- **English (en)** 🇺🇸 - Default language
- **French (fr)** 🇫🇷
- **Arabic (ar)** 🇸🇦 - RTL support enabled

## Translation File Format

Each `translation.json` file follows the same structure:

```json
{
  "search": "Search text",
  "nested": {
    "key": "Nested value"
  }
}
```

## Adding New Translations

1. **Add to all language files** - Ensure consistency across languages
2. **Use the same key structure** - Keys must match in all files
3. **Test RTL for Arabic** - Verify proper rendering

### Example: Adding a new key

#### en/translation.json
```json
{
  "newFeature": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}
```

#### fr/translation.json
```json
{
  "newFeature": {
    "title": "Nouvelle Fonctionnalité",
    "description": "Ceci est une nouvelle fonctionnalité"
  }
}
```

#### ar/translation.json
```json
{
  "newFeature": {
    "title": "ميزة جديدة",
    "description": "هذه ميزة جديدة"
  }
}
```

## Using Translations in Components

```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('newFeature.title')}</h1>
      <p>{t('newFeature.description')}</p>
    </div>
  );
}
```

## Translation Keys Reference

### Header
- `search` - Search button aria label
- `account` - Account button aria label
- `cart` - Shopping cart aria label
- `menu` - Menu button aria label

### Footer
- `newsletter.placeholder` - Newsletter input placeholder
- `newsletter.subscribe` - Subscribe button text
- `footerSections.*` - Footer section titles (shop, information, company)
- `footerLinks.*` - All footer navigation links
- `copyright` - Copyright text

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

## Best Practices

1. **Keep files in sync** - All translation files should have the same keys
2. **Use descriptive keys** - Make keys self-explanatory
3. **Organize by feature** - Group related translations together
4. **No hardcoded text** - Always use translation keys in components
5. **Test all languages** - Verify translations render correctly
6. **Consider text length** - Translations may be longer in some languages
7. **RTL considerations** - Test Arabic layout carefully

## Validation

To ensure all translation files are in sync, you can create a validation script:

```typescript
import en from './en/translation.json';
import fr from './fr/translation.json';
import ar from './ar/translation.json';

// Check if all keys exist in all languages
function validateTranslations() {
  const enKeys = Object.keys(en);
  const frKeys = Object.keys(fr);
  const arKeys = Object.keys(ar);
  
  // Add validation logic here
}
```

## Notes

- These JSON files are imported directly into the i18n config
- Changes to these files require a rebuild (Vite hot reload should work)
- Missing keys will fall back to English
- TypeScript will provide autocompletion for translation keys
