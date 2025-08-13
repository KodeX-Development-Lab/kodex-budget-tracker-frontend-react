const SkeletonTable = () => {
  return (
    <div className='mt-2 flex min-w-[1000px] flex-row items-center justify-between'>
      <div className='m-1 h-8 w-5 rounded-md bg-gray-300'></div>
      <div className='m-1 h-8 w-24 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-44 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-32 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-40 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-52 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-20 rounded-lg bg-gray-300'></div>
      <div className='m-1 h-8 w-32 rounded-lg bg-gray-300'></div>
    </div>
  )
}

const TableLoadingSkeleton = (props: any) => {
  return Array.from({ length: 12 }, (_, index) => <SkeletonTable key={index} />)
}

export default TableLoadingSkeleton
