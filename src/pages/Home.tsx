import React, { useEffect, lazy, Suspense } from 'react';
import Gallery from '@/components/Gallery';
import Details from '@/components/Details';
import Breadcrumb from '@/components/Breadcrumb';

// Lazy load non-critical below-the-fold components
const RelatedProducts = lazy(() => import('@/components/RelatedProducts'));
const ProductReviews = lazy(() => import('@/components/Reviews'));
const Pagination = lazy(() => import('@/components/Pagination').then(module => ({ default: module.Pagination })));
import { useProduct } from '@/hooks/useProduct';
import { useDetailsStore } from '@/store/detailsStore';
import { useTranslation } from '@/hooks/useTranslation';
import type { RelatedProduct } from '@/types/relatedProducts';
import type { Review, ReviewsStats, ReviewFilter } from '@/types/reviews';

// Import product images - WebP with PNG fallback
import p1 from '@/assets/products/p-1.webp';
import p1Fallback from '@/assets/products/p-1.png';
import p2 from '@/assets/products/p-2.webp';
import p2Fallback from '@/assets/products/p-2.png';
import p3 from '@/assets/products/p-3.webp';
import p3Fallback from '@/assets/products/p-3.png';
import p4 from '@/assets/products/p-4.webp';
import p4Fallback from '@/assets/products/p-4.png';
import p5 from '@/assets/products/p-5.webp';
import p5Fallback from '@/assets/products/p-5.png';

// Mock data for Related Products
const mockRelatedProducts: RelatedProduct[] = [
    {
        id: '1',
        name: 'Wide Leg Cropped Jeans',
        brand: 'Whistle',
        price: 26,
        rating: 4.8,
        soldCount: 1238,
        description: 'Wide Leg Cropped Jeans, Mid Wash',
        image: p1Fallback,
        imageWebp: p1,
        slug: 'wide-leg-cropped-jeans',
    },
    {
        id: '2',
        name: 'Long Sleeve Lady Shirt',
        brand: 'John Lewis ANYDAY',
        price: 26,
        rating: 4.8,
        soldCount: 1238,
        description: 'Long Sleeve Lady Shirt, Navy & G',
        image: p2Fallback,
        imageWebp: p2,
        slug: 'long-sleeve-lady-shirt',
    },
    {
        id: '3',
        name: 'Stripe Curved Hem Shirt',
        brand: 'John Lewis ANYDAY',
        price: 32,
        rating: 4.6,
        soldCount: 863,
        description: 'Stripe Curved Hem Shirt, Blue',
        image: p3Fallback,
        imageWebp: p3,
        slug: 'stripe-curved-hem-shirt',
    },
    {
        id: '4',
        name: 'Denim Overshirt',
        brand: 'John Lewis ANYDAY',
        price: 40,
        rating: 4.8,
        soldCount: 268,
        description: 'Denim Overshirt, Mid Wash',
        image: p4Fallback,
        imageWebp: p4,
        slug: 'denim-overshirt',
    },
    {
        id: '5',
        name: 'Linen Blazer',
        brand: 'John Lewis',
        price: 79,
        rating: 4.8,
        soldCount: 1238,
        description: 'Linen Blazer, Navy',
        image: p5Fallback,
        imageWebp: p5,
        slug: 'linen-blazer',
    },
];

// Mock data for Reviews
const mockReviews: Review[] = [
    {
        id: '1',
        rating: 5,
        comment: 'This is amazing product I have.',
        author: {
            name: 'Darrell Steward',
            avatar: p1,
        },
        date: '2020-07-08T21:25:00Z',
        helpful: 129,
        verified: true,
    },
    {
        id: '2',
        rating: 5,
        comment: 'This is amazing product I have.',
        author: {
            name: 'Darlena Robertson',
            avatar: p5,
        },
        date: '2020-07-02T13:04:00Z',
        helpful: 82,
        verified: true,
    },
    {
        id: '3',
        rating: 5,
        comment: 'This is amazing product I have.',
        author: {
            name: 'Kathryn Murphy',
            avatar: p1,
        },
        date: '2020-06-28T22:03:00Z',
        helpful: 9,
        verified: false,
    },
    {
        id: '4',
        rating: 5,
        comment: 'This is amazing product I have.',
        author: {
            name: 'Ronald Richards',
            avatar: p5,
        },
        date: '2020-07-07T22:43:00Z',
        helpful: 124,
        verified: true,
    },
];

const mockReviewsStats: ReviewsStats = {
    averageRating: 4.5,
    totalReviews: 1251,
    distribution: {
        5: 2923,
        4: 38,
        3: 4,
        2: 0,
        1: 0,
    },
};

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { product, isLoading, error } = useProduct('Sneakers12');
    const {
        setProduct,
        availableColors,
        selectedVariations,
        setSelectedVariation
    } = useDetailsStore();

    useEffect(() => {
        if (product) {
            setProduct(product);
        }
    }, [product, setProduct]);

    const handleLike = () => {
        alert(t('products.addedToFavorites'));
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.name || 'Check out this product',
                    text: product?.description || '',
                    url: window.location.href,
                });
            } catch (err) {
                // Share canceled
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert(t('products.linkCopied'));
        }
    };

    const handleFilterChange = (filter: ReviewFilter) => {
        // Implement filter logic here
    };

    // Transform colors to gallery images - use the color's value (image URL) directly
    const galleryImages = availableColors.map((color) => {
        const isImageUrl = color.value && (color.value.startsWith('http') || color.value.startsWith('/'));
        const imageUrl = isImageUrl ? color.value : (product?.thumb || '');
        
        return {
            id: color.id,
            name: color.name,
            value: imageUrl || '',
        };
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-error mb-4">Failed to load product</p>
                    <p className="text-text-secondary text-sm">{error.message}</p>
                </div>
            </div>
        );
    }

    if (!product || galleryImages.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-text-secondary">No product images available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Homepage', href: '/' },
                        { label: 'Women', href: '/women' },
                        { label: "Women's Shirts & Tops", href: '/women/shirts-tops' },
                        { label: 'Long Sleeve Overshirt, Khaki, 6' }
                    ]}
                />

                {/* Product Gallery & Details */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
                    <Gallery
                        images={galleryImages}
                        selectedImage={selectedVariations.color || galleryImages[0]?.name || ''}
                        onImageChange={(colorName) => setSelectedVariation('color', colorName)}
                    />
                    
                    <Details product={product} />
                </div>

                {/* Related Products Section */}
                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
                  <RelatedProducts
                      products={mockRelatedProducts}
                      onViewAll={() => alert('View all products')}
                      onProductClick={(product) => alert(`Clicked: ${product.name}`)}
                  />
                </Suspense>
                
                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading reviews...</div></div>}>
                  <ProductReviews
                      reviews={mockReviews}
                      stats={mockReviewsStats}
                      onFilterChange={handleFilterChange}
                      onHelpful={(id) => alert(`Marked review ${id} as helpful`)}
                      onReport={(id) => alert(`Reported review ${id}`)}
                  />
                </Suspense>

                <Suspense fallback={<div className="h-20"></div>}>
                  <Pagination currentPage={1} totalPages={10} onPageChange={function (page: number): void {
                      throw new Error('Function not implemented.');
                  } } />
                </Suspense>

                {/* Popular this week Section */}
                <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
                  <RelatedProducts
                      products={mockRelatedProducts}
                      title={t('products.popularThisWeek')}
                      onViewAll={() => alert('View all popular products')}
                      onProductClick={(product) => alert(`Clicked: ${product.name}`)}
                  />
                </Suspense>
                
            </div>
        </div>
    );
};

export default Home;
