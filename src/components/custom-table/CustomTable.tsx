/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useStateFromProps from '@/hooks/use-state-from-props'
import { Button } from '../ui/button'
import Header from './Header'
import TableBody from './TableBody'

export type Column = {
  id: string
  name: string
  width: string
  copy?: boolean
  component: (row: any) => JSX.Element
}

type CustomTableProps = {
  data: Array<any>
  columns: Array<Column>
  onChange: (value: any) => void
  showAddNewRowButton?: boolean
  addItemsInBulk?: () => void
  readOnly?: boolean
}

const CustomTable = ({
  data: propsData,
  columns,
  onChange,
  showAddNewRowButton = true,
  addItemsInBulk,
}: CustomTableProps) => {
  const [data, setData] = useStateFromProps(propsData)

  const handleAddNewRow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const row = {
      rowId: uuidv4(),
      rowStatus: 'new',
      ...Object.fromEntries(columns.map((el) => [el.id, null])),
    }

    onChange([...data, row])
  }

  const handleRemoveRow = (id: number) => {
    const newData = data.filter((el) => el?.id !== id)
    onChange(newData)
  }

  return (
    <div className='w-full'>
      <Header columns={columns} />
      <TableBody
        data={data}
        setData={setData}
        columns={columns}
        onDelete={handleRemoveRow}
      />
      <div className='mt-[20px] grid w-full grid-cols-2'>
        <div className='flex items-center gap-[10px]'>
          {showAddNewRowButton && (
            <Button onClick={handleAddNewRow}>Add New Row</Button>
          )}
          {!!addItemsInBulk && (
            <Button onClick={addItemsInBulk}>Add Items in Bulk</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomTable
