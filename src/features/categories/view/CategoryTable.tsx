import { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Route } from '@/routes/_authenticated/categories'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { PaginationInfo } from '@/lib/types'
import { usePagination } from '@/hooks/usePagination'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import PaginationComponent from '@/components/PaginationComponent'
import TableLoadingSkeleton from '@/components/TableLoadingSkeleton'
import { DeleteConfirmDialog } from '@/components/dialog/DeletePopUp'
import {
  CategoryType,
  isTransactionType,
  TransactionTypes,
  transactionTypeOptions
} from '@/features/budgets/types/budget-types'
import { CategoriesByParamsQueryKey } from '../api/key'
import { useDeleteCategory } from '../api/mutations/mutation'
import { useCategoriesByParams } from '../api/queries/query'
import { CategoryFormDialog } from '../components/CategoryFormDialog'
import CategoryDataTable from '../components/table/CategoryDataTable'
import { columns as getColumns } from '../components/table/CategoryTableColumns'
import { SingleSelectDropdown } from '@/components/form-fields/SingleSelectDropdown'

const CategoryTable = () => {
  const queryClient = useQueryClient()
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | string | null>(null)
  const [selectedItem, setSelectedItem] = useState<CategoryType | null>(null)

  const [openAddNewDialog, setOpenAddNewDialog] = useState(false)
  const [categoryDialogMode, setCategoryDialogMode] = useState<
    'create' | 'edit'
  >('create')

  // Search & Filter
  const [type, setType] = useState<string | number>(TransactionTypes.ALL)

  const params = useMemo(
    () => ({
      page: searchParams.page || '1',
      per_page: searchParams.per_page || '20',
      search: '',
      type: searchParams.type || TransactionTypes.ALL,
    }),
    [searchParams]
  )

  const handleTypeChange = (value: string | number) => {
    setType(value)
    navigate({
      search: (prev) => ({
        ...prev, // Keep existing search params
        type: isTransactionType(value) ? value : TransactionTypes.ALL,
      }),
    })
  }

  const { data, isLoading } = useCategoriesByParams(params)

  const responsePaginationInfo: PaginationInfo = useMemo(
    () => ({
      current_page: data?.categories?.current_page || 1,
      first_page_url: data?.categories?.first_page_url || null,
      from: data?.categories?.from || 0,
      last_page: data?.categories?.last_page || 1,
      last_page_url: data?.categories?.last_page_url || null,
      links: data?.categories?.links || [],
      next_page_url: data?.categories?.next_page_url || null,
      path: data?.categories?.path || null,
      per_page: data?.categories?.per_page || 10,
      prev_page_url: data?.categories?.prev_page_url || null,
      to: data?.categories?.to || 0,
      total: data?.categories?.total || 0,
    }),
    [data]
  )

  const { paginationInfo, goToPage, prevPage, nextPage, changePageSize } =
    usePagination(Route, responsePaginationInfo)

  const handleEditClick = useCallback((item: CategoryType) => {
    setSelectedItem(item)
    setOpenAddNewDialog(true)
    setCategoryDialogMode('edit')
  }, [])

  const handleDeleteClick = useCallback((id: string | number) => {
    setSelectedId(id as string)
    setIsDeleteDialogOpen(true)
  }, [])

  const categoryDeleteMutation = useDeleteCategory()
  const confirmSingleDelete = useCallback(() => {
    if (!selectedId) return
    categoryDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        setSelectedId(null)
        toast.success('deleted')
        queryClient.invalidateQueries({
          queryKey: [CategoriesByParamsQueryKey],
        })
      },
    })
  }, [selectedId, categoryDeleteMutation])

  const columnData = useMemo(
    () => getColumns(handleEditClick, handleDeleteClick),
    [handleEditClick, handleDeleteClick]
  )

  if (isLoading) return <TableLoadingSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-bold'>Categories</CardTitle>
        <CardAction>
          <div className='flex gap-1'>
            <Button
              variant='default'
              onClick={() => {
                setSelectedId(null)
                setSelectedItem(null)
                setCategoryDialogMode('create')
                setOpenAddNewDialog(true)
              }}
            >
              <Plus /> Add
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CategoryFormDialog
        mode={categoryDialogMode}
        open={openAddNewDialog}
        onOpenChange={setOpenAddNewDialog}
        initialData={selectedItem}
      />
      <CardContent>
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={() => setIsDeleteDialogOpen(false)}
          // onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmSingleDelete}
          isLoading={categoryDeleteMutation.isPending}
        />
        <div className='my-5'>
          <SingleSelectDropdown
            options={transactionTypeOptions}
            value={type}
            onChange={handleTypeChange}
            placeholder='Filter by category'
            className='w-[200px]'
          />
        </div>
        <CategoryDataTable columns={columnData} data={data?.categories?.data} />
        <div className='mt-[20px]'>
          <PaginationComponent
            paginationInfo={paginationInfo}
            onNextPage={nextPage}
            onPreviousPage={prevPage}
            onGoToPage={goToPage}
            changePageSize={changePageSize}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryTable
