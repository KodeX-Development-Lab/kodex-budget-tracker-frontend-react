import { Column } from './CustomTable'

const Header = ({ columns }: { columns: Column[] }) => {
  return (
    <div className='text-12 mr-auto flex w-[calc(100%-17px)] items-center font-[600] uppercase'>
      {columns?.map((column) => (
        <div
          key={column?.id}
          style={{ width: column.width }}
          className='text-goalinputborder border-input flex h-auto min-h-[38px] flex-col items-start justify-center border-[0.5px] px-[10px] text-left text-xs'
        >
          {column?.name}
        </div>
      ))}
    </div>
  )
}

export default Header
