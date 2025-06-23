/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reorder } from 'framer-motion'
import { Column } from './CustomTable'
import TableRow from './TableRow'

type TableBodyProps = {
  data: any[]
  setData: React.Dispatch<React.SetStateAction<any[]>>
  columns: Column[]
  onDelete: (id: number) => void
}

const TableBody = ({ data, setData, columns, onDelete }: TableBodyProps) => {
  return (
    <>
      {data?.length ? (
        <Reorder.Group
          axis='y'
          values={data}
          onReorder={setData}
          className='w-auto'
          transition={{ duration: 0, delay: 0 }}
        >
          {data.map((row) => (
            <TableRow
              key={row?.id}
              row={row}
              columns={columns}
              onDelete={onDelete}
            />
          ))}
        </Reorder.Group>
      ) : (
        <div className='w-full p-[20px] text-center text-sm'>
          No data available
        </div>
      )}
    </>
  )
}

export default TableBody
