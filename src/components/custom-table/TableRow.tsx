/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reorder, useDragControls } from 'framer-motion'
import { X } from 'lucide-react'
import { Column } from './CustomTable'

type TableRowProps = {
  row: any
  columns: Column[]
  onDelete: (id: number) => void
}

const TableRow = ({ row, columns, onDelete }: TableRowProps) => {
  const dragControls = useDragControls()
  return (
    <Reorder.Item
      key={row?.id}
      id={row?.id}
      value={row}
      dragListener={false}
      dragControls={dragControls}
      transition={{ duration: 0, delay: 0 }}
    >
      <div className='relative flex w-full items-start'>
        <div className='mx-auto w-full'>
          {/* main */}
          <div className='flex w-full items-stretch'>
            {columns.map((column, index) => (
              <div
                key={index}
                style={{ width: column.width }}
                className='border-input flex min-h-[40px] items-center justify-start border-[0.5px]'
              >
                {column.component ? column.component(row) : null}
              </div>
            ))}
          </div>
        </div>
        <div className='mt-[4px] ml-[5px] w-[12px]'>
          <span
            className='flex h-auto cursor-pointer items-center'
            onClick={() => {
              onDelete(row?.id)
            }}
          >
            <X />
          </span>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default TableRow
