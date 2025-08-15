import { FC, Fragment, useMemo } from 'react'
import classNames from 'classnames'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export interface TablePaginationInfo {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface PaginationComponentProps {
  paginationInfo: TablePaginationInfo
  onNextPage: () => void
  onPreviousPage: () => void
  onGoToPage: (page: number) => void
  changePageSize: (pageSize: number) => void,
}

const PaginationComponent = ({
  paginationInfo,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  changePageSize
}: PaginationComponentProps) => {
  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = paginationInfo

  const fromItemNumber = useMemo(
    () => (currentPage - 1) * pageSize + 1,
    [currentPage, pageSize]
  )

  const toItemNumber = useMemo(() => {
    const calculated = currentPage * pageSize
    return calculated > totalItems ? totalItems : calculated
  }, [currentPage, pageSize, totalItems])

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
      <div className='flex items-center gap-2'>
        <span className='text-graydark'>DISPLAY</span>
        <Select
            value={`${pageSize}`}
            onValueChange={(value) =>changePageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>
      <p className='text-12 text-graydark leading-[18px]'>
        Displaying items from {fromItemNumber} to {toItemNumber} of total{' '}
        {totalItems} items.
      </p>

      {/* Page navigation */}
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={onPreviousPage}
            disabled={!hasPreviousPage}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          {Number.isInteger(totalPages) && totalPages > 0 && (
            <div className='flex items-center space-x-1'>
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                const showLeftEllipsis = currentPage > 4 && page === 2
                const showRightEllipsis =
                  currentPage < totalPages - 3 && page === totalPages - 1

                if (showLeftEllipsis || showRightEllipsis) {
                  return (
                    <Button
                      key={index}
                      variant='ghost'
                      className='h-8 w-8 p-0'
                      disabled
                    >
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  )
                }

                if (
                  page !== 1 &&
                  page !== totalPages &&
                  (page < currentPage - 2 || page > currentPage + 2)
                ) {
                  return null
                }

                return (
                  <Button
                    key={index}
                    variant={page === currentPage ? 'default' : 'ghost'}
                    className='h-8 w-8 p-0'
                    onClick={() => onGoToPage(page)}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
          )}

          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={onNextPage}
            disabled={!hasNextPage}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaginationComponent
