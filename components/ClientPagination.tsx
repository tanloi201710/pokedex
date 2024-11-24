'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLoading } from './LoadingContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function ClientPagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const { isLoading, setIsLoading } = useLoading()

  const handlePageChange = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);
    router.push(`/?page=${page}`);
  };

  const renderPageNumbers = () => {
    const pages = []
    const showDots = totalPages > 7

    if (showDots) {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    } else {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    }

    return pages.map((page, index) => (
      page === '...' ? (
        <span key={`dots-${index}`} className="px-4 py-2">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page as number)}
          disabled={currentPage === page}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-foreground text-background'
              : 'bg-foreground/10 hover:bg-foreground/20'
          }`}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      )
    ))
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-2">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
} 