# State Management & API Documentation

## Zustand Store with Immer

### Settings Store (Language & Currency)

The settings store manages global application settings like language and currency preferences. It uses Zustand with Immer middleware for easy state updates and persist middleware for localStorage persistence.

#### Import the store:
```typescript
import { useSettingsStore, languages, currencies } from '@/store/settingsStore';
```

#### Usage in components:
```typescript
function MyComponent() {
  const { language, currency, setLanguage, setCurrency } = useSettingsStore();

  return (
    <div>
      <p>Current Language: {language.name} {language.flag}</p>
      <p>Current Currency: {currency}</p>
      
      <button onClick={() => setLanguage(languages[1])}>
        Switch to French
      </button>
      
      <button onClick={() => setCurrency('EGP')}>
        Switch to EGP
      </button>
    </div>
  );
}
```

#### Available Languages:
- English (en) 🇺🇸
- French (fr) 🇫🇷
- Arabic (ar) 🇸🇦

#### Available Currencies:
- USD
- EGP
- SAR

#### Store Features:
- ✅ Persistent state (survives page refresh)
- ✅ Immutable updates with Immer
- ✅ Type-safe with TypeScript
- ✅ Global state accessible from any component

---

## SWR for API Fetching

SWR is a React Hooks library for data fetching with built-in caching, revalidation, and error handling.

### Available Hooks:

#### 1. useProducts()
Fetches all products with caching and automatic revalidation.

```typescript
import { useProducts } from '@/hooks/useApi';

function ProductList() {
  const { products, isLoading, isError, mutate } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

#### 2. useProduct(id)
Fetches a single product by ID.

```typescript
import { useProduct } from '@/hooks/useApi';

function ProductDetail({ productId }) {
  const { product, isLoading, isError } = useProduct(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return <div>{product.name}</div>;
}
```

#### 3. useExchangeRates(baseCurrency)
Fetches exchange rates for currency conversion. Automatically refreshes every hour.

```typescript
import { useExchangeRates } from '@/hooks/useApi';
import { useSettingsStore } from '@/store/settingsStore';

function PriceConverter() {
  const { currency } = useSettingsStore();
  const { rates, isLoading } = useExchangeRates(currency);

  return (
    <div>
      {!isLoading && rates && (
        <p>1 {currency} = {rates.EGP} EGP</p>
      )}
    </div>
  );
}
```

#### 4. useTranslations(languageCode)
Fetches translations for the selected language.

```typescript
import { useTranslations } from '@/hooks/useApi';
import { useSettingsStore } from '@/store/settingsStore';

function TranslatedContent() {
  const { language } = useSettingsStore();
  const { translations, isLoading } = useTranslations(language.code);

  return (
    <div>
      {!isLoading && translations && (
        <h1>{translations.welcome}</h1>
      )}
    </div>
  );
}
```

### SWR Features:
- ✅ Automatic caching
- ✅ Request deduplication
- ✅ Automatic revalidation
- ✅ Error retry
- ✅ Pagination support
- ✅ Focus revalidation (optional)
- ✅ Network status revalidation

### Custom Fetcher:
You can customize the fetcher function in `/src/hooks/useApi.ts` to add headers, authentication, etc.

```typescript
export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  
  return response.json();
};
```

---

## Best Practices

### 1. Combining Zustand and SWR:
```typescript
function PriceDisplay({ basePrice }) {
  const { currency } = useSettingsStore();
  const { rates, isLoading } = useExchangeRates('USD');
  
  const convertedPrice = !isLoading && rates 
    ? basePrice * rates[currency] 
    : basePrice;

  return <p>{convertedPrice} {currency}</p>;
}
```

### 2. Conditional Data Fetching:
Pass `null` to disable SWR fetching when data isn't needed.

```typescript
const { data } = useProduct(shouldFetch ? productId : null);
```

### 3. Manual Revalidation:
Use the `mutate` function to manually refresh data.

```typescript
const { data, mutate } = useProducts();

// After updating a product
await updateProduct(productId, newData);
mutate(); // Refresh the products list
```

### 4. Global SWR Configuration:
Add to your `App.tsx` for global SWR settings:

```typescript
import { SWRConfig } from 'swr';
import { fetcher } from '@/hooks/useApi';

function App() {
  return (
    <SWRConfig 
      value={{
        fetcher,
        revalidateOnFocus: false,
        dedupingInterval: 2000,
      }}
    >
      <YourApp />
    </SWRConfig>
  );
}
```

---

## File Structure

```
src/
├── store/
│   └── settingsStore.ts       # Zustand store with Immer
├── hooks/
│   └── useApi.ts              # SWR hooks for API calls
└── components/
    └── Footer.tsx             # Example usage of settingsStore
```
