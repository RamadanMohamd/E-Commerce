import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant={currentPage === 1 ? 'ghost' : 'outline'}
        size="sm"
        className={cn('w-10 h-10 rounded-lg flex items-center justify-center transition-all', currentPage === 1 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900')}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            onClick={() => onPageChange(page as number)}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size="sm"
            className={cn('w-10 h-10 rounded-lg text-sm font-medium transition-all', currentPage === page ? 'bg-gray-900 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-900')}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant={currentPage === totalPages ? 'ghost' : 'outline'}
        size="sm"
        className={cn('w-10 h-10 rounded-lg flex items-center justify-center transition-all', currentPage === totalPages ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900')}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </Button>
    </div>
  );
};
