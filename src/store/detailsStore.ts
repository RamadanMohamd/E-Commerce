import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Details, VariationProp, ProductVariant } from '@/types/products';

interface SelectedVariations {
  color?: string;
  size?: string;
}

interface DetailsState {
  product: Details | null;
  selectedVariations: SelectedVariations;
  selectedVariant: ProductVariant | null;
  availableColors: VariationProp[];
  availableSizes: VariationProp[];
  
  setProduct: (product: Details) => void;
  setSelectedVariation: (variationType: 'color' | 'size', value: string) => void;
  clearSelectedVariations: () => void;
}

export const useDetailsStore = create<DetailsState>()(
  immer((set, get) => ({
    product: null,
    selectedVariations: {},
    selectedVariant: null,
    availableColors: [],
    availableSizes: [],

    setProduct: (product: Details) => {
      set((state: DetailsState) => {
        let availableColors: VariationProp[] = [];
        let availableSizes: VariationProp[] = [];

        product.variations.forEach((variation) => {
          if (variation.name === 'color') {
            availableColors = variation.props;
          } else if (variation.name === 'size') {
            availableSizes = variation.props;
          }
        });

        state.product = product;
        state.availableColors = availableColors;
        state.availableSizes = availableSizes;
        
        const initialColor = availableColors[0]?.name || '';
        const initialSize = availableSizes[0]?.name || '';
        
        state.selectedVariations = {
          color: initialColor,
          size: initialSize,
        };

        // Find initial variant
        if (initialColor && initialSize && product.variants) {
          const colorProp = availableColors[0];
          const sizeProp = availableSizes[0];
          
          if (colorProp && sizeProp) {
            const initialVariant = product.variants.find(variant => {
              const variantPropValues = variant.variation_props.map(vp => vp.variation_prop);
              return variantPropValues.includes(colorProp.name.toLowerCase()) && 
                     variantPropValues.includes(sizeProp.name);
            }) || null;
            
            state.selectedVariant = initialVariant;
          }
        }
      });
    },

    setSelectedVariation: (variationType: 'color' | 'size', value: string) => {
      const { selectedVariations, availableColors, availableSizes, product } = get();
      
      const newSelectedVariations = {
        ...selectedVariations,
        [variationType]: value,
      };

      set((state: DetailsState) => {
        state.selectedVariations[variationType] = value;

        if (newSelectedVariations.color && newSelectedVariations.size && product?.variants) {
          const selectedColorProp = availableColors.find(c => c.name === newSelectedVariations.color);
          const selectedSizeProp = availableSizes.find(s => s.name === newSelectedVariations.size);

          if (selectedColorProp && selectedSizeProp) {
            const matchedVariant = product.variants.find(variant => {
              const variantPropValues = variant.variation_props.map(vp => vp.variation_prop);
              return variantPropValues.includes(selectedColorProp.name.toLowerCase()) && 
                     variantPropValues.includes(selectedSizeProp.name);
            }) || null;

            state.selectedVariant = matchedVariant;
          } else {
            state.selectedVariant = null;
          }
        } else {
          state.selectedVariant = null;
        }
      });
    },

    clearSelectedVariations: () => {
      set((state: DetailsState) => {
        state.selectedVariations = {};
        state.selectedVariant = null;
      });
    },
  }))
);
