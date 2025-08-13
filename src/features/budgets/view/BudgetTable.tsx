import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useFilters } from '@/hooks/useFilters'
import { PageInfo, usePagination } from '@/hooks/usePagination'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardAction,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import PaginationCompoment from '@/components/PaginationComponent'
import TableLoadingSkeleton from '@/components/TableLoadingSkeleton'
import { DeleteConfirmDialog } from '@/components/dialog/DeletePopUp'
import { allBudgetsQueryKey } from '../api/key'
import {
  useDeleteBudgetItem,
  useSaveBudgetItem,
} from '../api/mutations/mutation'
import { useBudgetList } from '../api/queries/query'
import { BudgetAddDialog } from '../components/BudgetAddDialog'
import BudgetDataTable from '../components/table/BudgetDataTable'
import { columns as getColumns } from '../components/table/BudgetTableColumns'
import BudgetTableFilter from '../components/table/BudgetTableFilter'
import { useBudgetContext } from '../context/budget-context'
import { BudgetFormSchema, BudgetFormSchemaType } from '../data/schema'
import { TransactionTypes } from '../types/budget-types'

const BudgetTable = () => {
  const queryClient = useQueryClient()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | string | null>(null)

  const [openAddNewDialog, setOpenAddNewDialog] = useState(false)
  const [budgetDialogMode, setBudgetDialogMode] = useState<'create' | 'edit'>(
    'create'
  )

  const { budgets, isLoading } = useBudgetContext()

  const handleEditClick = useCallback((id: string | number) => {
    // setSelectedId(id as string);
    // setIsDeleteDialogOpen(true);
  }, [])

  const handleDeleteClick = useCallback((id: string | number) => {
    setSelectedId(id as string)
    setIsDeleteDialogOpen(true)
  }, [])

  const budgetDeleteMutation = useDeleteBudgetItem()
  const confirmSingleDelete = useCallback(() => {
    if (!selectedId) return
    budgetDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        setSelectedId(null)
        toast.success('deleted')
        queryClient.invalidateQueries({ queryKey: [allBudgetsQueryKey] })
      },
    })
  }, [selectedId, budgetDeleteMutation])

  const columnData = useMemo(
    () => getColumns(handleEditClick, handleDeleteClick),
    [handleEditClick, handleDeleteClick]
  )

  if (isLoading) return <TableLoadingSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-bold'>Budget List</CardTitle>
        <CardAction>
          <div className='flex gap-1'>
            <Button variant='default' onClick={() => setOpenAddNewDialog(true)}>
              <Plus /> Add
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <BudgetAddDialog
        mode={budgetDialogMode}
        open={openAddNewDialog}
        onOpenChange={setOpenAddNewDialog}
      />
      <CardContent>
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={() => setIsDeleteDialogOpen(false)}
          // onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmSingleDelete}
          isLoading={budgetDeleteMutation.isPending}
        />
        <BudgetTableFilter />
        <BudgetDataTable columns={columnData} data={budgets.data} />
        <div className='mt-[20px]'>
          {/* <PaginationCompoment
            pageInfo={pagination.pageInfo}
            onNextPage={pagination.nextPage}
            onPreviousPage={pagination.prevPage}
            onGoToPage={pagination.goToPage}
          /> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetTable
