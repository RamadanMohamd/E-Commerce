import { describe, it, expect, beforeEach } from 'vitest';
import { useDetailsStore } from '../../store/detailsStore';
import type { Details, Variation, ProductVariant } from '../../types/products';

// Helper function to create mock product data
const createMockProduct = (
  colorProps: string[],
  sizeProps: string[],
  variantCombinations: Array<{ color: string; size: string; quantity: number }>
): Details => {
  const colorVariation: Variation = {
    id: '1',
    name: 'color',
    product_id: '1',
    type: 'button',
    props: colorProps.map((color, index) => ({
      id: `color-${index}`,
      name: color,
      variation_id: '1',
    })),
  };

  const sizeVariation: Variation = {
    id: '2',
    name: 'size',
    product_id: '1',
    type: 'button',
    props: sizeProps.map((size, index) => ({
      id: `size-${index}`,
      name: size,
      variation_id: '2',
    })),
  };

  const variants: ProductVariant[] = variantCombinations.map((combo, index) => ({
    id: `variant-${index}`,
    product_id: '1',
    price: 100,
    sale_price: 80,
    quantity: combo.quantity,
    taager_code: `TEST-${index}`,
    variation_props: [
      {
        id: `vp-color-${index}`,
        variation: 'color',
        variation_prop: combo.color,
        product_variant_id: `variant-${index}`,
      },
      {
        id: `vp-size-${index}`,
        variation: 'size',
        variation_prop: combo.size,
        product_variant_id: `variant-${index}`,
      },
    ],
  }));

  return {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    sale_price: 80,
    slug: 'test-product',
    thumb: '',
    images: [],
    variations: [colorVariation, sizeVariation],
    variants,
    updated_at: '',
    created_at: '',
    store_id: '1',
    position: 0,
    hidden: false,
    quantity: 100,
    track_stock: false,
    disable_orders_for_no_stock: false,
    show_landing_in_same_page: false,
    buy_now_text: 'Buy Now',
    is_fixed_bottom_buy: false,
    is_one_page_checkout: false,
    fake_visitors_min: 0,
    fake_visitors_max: 0,
    fake_timer_hours: 0,
    is_quantity_hidden: false,
    is_header_hidden: false,
    is_free_shipping: false,
    custom_currency: '',
    is_checkout_before_description: false,
    hide_related_products: false,
    is_taager_submit_active: false,
    is_ecombo_submit_active: false,
    is_mosaweq_submit_active: false,
    is_alturky_submit_active: false,
    is_jamaica_submit_active: false,
    is_engzny_submit_active: false,
    is_digital: false,
    is_cloaking_active: false,
  };
};

describe('Details Store', () => {
  beforeEach(() => {
    const { clearSelectedVariations } = useDetailsStore.getState();
    clearSelectedVariations();
    useDetailsStore.setState({ product: null });
  });

  describe('setProduct', () => {
    it('should set product and extract available colors and sizes', () => {
      const mockProduct = createMockProduct(
        ['red', 'blue'],
        ['M', 'L'],
        [
          { color: 'red', size: 'M', quantity: 10 },
          { color: 'blue', size: 'L', quantity: 5 },
        ]
      );

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);

      const state = useDetailsStore.getState();
      expect(state.product).toEqual(mockProduct);
      expect(state.availableColors.length).toBe(2);
      expect(state.availableColors[0].name).toBe('red');
      expect(state.availableSizes.length).toBe(2);
    });

    it('should set initial selected color and size to first available', () => {
      const mockProduct = createMockProduct(
        ['green', 'yellow'],
        ['S', 'XL'],
        [{ color: 'green', size: 'S', quantity: 10 }]
      );

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);

      const state = useDetailsStore.getState();
      expect(state.selectedVariations.color).toBe('green');
      expect(state.selectedVariations.size).toBe('S');
    });

    it('should find and set the initial selected variant', () => {
      const mockProduct = createMockProduct(
        ['red', 'blue'],
        ['M', 'L'],
        [
          { color: 'red', size: 'M', quantity: 10 },
          { color: 'blue', size: 'L', quantity: 5 },
        ]
      );

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);

      const state = useDetailsStore.getState();
      expect(state.selectedVariant).toBeDefined();
      expect(state.selectedVariant?.id).toBe('variant-0');
    });

    it('should handle product with no variants', () => {
      const mockProduct = createMockProduct([], [], []);

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);

      const state = useDetailsStore.getState();
      expect(state.product).toEqual(mockProduct);
      expect(state.availableColors).toEqual([]);
      expect(state.availableSizes).toEqual([]);
    });
  });

  describe('setSelectedVariation', () => {
    beforeEach(() => {
      const mockProduct = createMockProduct(
        ['red', 'blue'],
        ['M', 'L'],
        [
          { color: 'red', size: 'M', quantity: 10 },
          { color: 'blue', size: 'L', quantity: 5 },
          { color: 'red', size: 'L', quantity: 8 },
          { color: 'blue', size: 'M', quantity: 3 },
        ]
      );

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);
    });

    it('should update selected color and find matching variant', () => {
      const { setSelectedVariation } = useDetailsStore.getState();
      setSelectedVariation('color', 'blue');

      const state = useDetailsStore.getState();
      expect(state.selectedVariations.color).toBe('blue');
      expect(state.selectedVariant).toBeDefined();
      
      // Check that variant has blue color
      const hasBlue = state.selectedVariant?.variation_props.some(
        (prop: { variation: string; variation_prop: string }) => 
          prop.variation === 'color' && prop.variation_prop === 'blue'
      );
      expect(hasBlue).toBe(true);
    });

    it('should update selected size and find matching variant', () => {
      const { setSelectedVariation } = useDetailsStore.getState();
      setSelectedVariation('size', 'L');

      const state = useDetailsStore.getState();
      expect(state.selectedVariations.size).toBe('L');
      expect(state.selectedVariant).toBeDefined();
      
      // Check that variant has size L
      const hasL = state.selectedVariant?.variation_props.some(
        (prop: { variation: string; variation_prop: string }) => 
          prop.variation === 'size' && prop.variation_prop === 'L'
      );
      expect(hasL).toBe(true);
    });

    it('should update variant when both color and size change', () => {
      const { setSelectedVariation } = useDetailsStore.getState();
      
      setSelectedVariation('color', 'blue');
      let state = useDetailsStore.getState();
      const variant1 = state.selectedVariant;

      setSelectedVariation('size', 'L');
      state = useDetailsStore.getState();
      const variant2 = state.selectedVariant;
      
      expect(variant1?.id).not.toBe(variant2?.id);
      expect(variant2?.id).toBe('variant-1'); // blue + L
    });
  });

  describe('clearSelectedVariations', () => {
    it('should clear selected variations and variant', () => {
      const mockProduct = createMockProduct(
        ['red'],
        ['M'],
        [{ color: 'red', size: 'M', quantity: 10 }]
      );

      const { setProduct, clearSelectedVariations } = useDetailsStore.getState();
      setProduct(mockProduct);
      
      // Verify initial state has selections
      let state = useDetailsStore.getState();
      expect(state.selectedVariations.color).toBeDefined();
      expect(state.selectedVariant).toBeDefined();

      clearSelectedVariations();
      
      // Verify state is cleared
      state = useDetailsStore.getState();
      expect(state.selectedVariations).toEqual({});
      expect(state.selectedVariant).toBeNull();
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple variants with same color but different sizes', () => {
      const mockProduct = createMockProduct(
        ['red'],
        ['S', 'M', 'L'],
        [
          { color: 'red', size: 'S', quantity: 10 },
          { color: 'red', size: 'M', quantity: 5 },
          { color: 'red', size: 'L', quantity: 8 },
        ]
      );

      const { setProduct, setSelectedVariation } = useDetailsStore.getState();
      setProduct(mockProduct);

      setSelectedVariation('size', 'M');
      let state = useDetailsStore.getState();
      expect(state.selectedVariant?.id).toBe('variant-1');

      setSelectedVariation('size', 'L');
      state = useDetailsStore.getState();
      expect(state.selectedVariant?.id).toBe('variant-2');
    });

    it('should extract unique colors and sizes from variants', () => {
      const mockProduct = createMockProduct(
        ['red', 'blue'],
        ['M', 'L'],
        [
          { color: 'red', size: 'M', quantity: 10 },
          { color: 'red', size: 'L', quantity: 5 },
          { color: 'blue', size: 'M', quantity: 8 },
          { color: 'blue', size: 'L', quantity: 3 },
        ]
      );

      const { setProduct } = useDetailsStore.getState();
      setProduct(mockProduct);

      const state = useDetailsStore.getState();
      expect(state.availableColors.map((c: { name: string }) => c.name)).toEqual(['red', 'blue']);
      expect(state.availableSizes.map((s: { name: string }) => s.name)).toEqual(['M', 'L']);
    });

    it('should maintain product reference after variation changes', () => {
      const mockProduct = createMockProduct(
        ['red'],
        ['M'],
        [{ color: 'red', size: 'M', quantity: 10 }]
      );

      const { setProduct, setSelectedVariation } = useDetailsStore.getState();
      setProduct(mockProduct);

      setSelectedVariation('color', 'red');
      const state = useDetailsStore.getState();
      
      expect(state.product).toEqual(mockProduct);
    });
  });
});
