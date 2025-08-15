import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { PaginationInfo } from '@/lib/types'

export const usePagination = (Route: any, pagination: PaginationInfo) => {
  const { page, per_page } = Route.useSearch()
  const navigate = Route.useNavigate()

  const paginationInfo = {
    currentPage: pagination?.current_page ?? page,
    totalPages: pagination?.last_page ?? 1, //totalPagesNo??1,
    totalItems: pagination?.total ?? 0,
    pageSize: Number(pagination?.per_page) ?? Number(per_page),
    hasNextPage: pagination ? page < pagination.last_page : false,
    hasPreviousPage: pagination ? page > 1 : false,
  }

  const changePageSize = useCallback(
    (newPerPage: number) => {
      return navigate({
        search: { per_page: newPerPage },
      })
    },
    [page, navigate, per_page]
  )

  const goToPage = useCallback(
    (newPage: number) => {
      return navigate({
        search: (prev: any) => ({ ...prev,page: newPage, per_page }),
      })
    },
    [page, navigate, per_page]
  )

  const nextPage = useCallback(() => {
    if (pagination && page < pagination.last_page) {
      goToPage(page + 1)
    }
  }, [pagination, page, goToPage])

  const prevPage = useCallback(() => {
    if (pagination && page > 1) {
      goToPage(page - 1)
    }
  }, [pagination, page, goToPage])

  return {
    paginationInfo,
    changePageSize,
    goToPage,
    nextPage,
    prevPage,
  }
}
