export interface RelatedProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  description: string;
  rating: number;
  soldCount: number;
  image: string;
  imageWebp?: string;
  slug: string;
}

export interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
  onViewAll?: () => void;
  onProductClick?: (product: RelatedProduct) => void;
  className?: string;
}
