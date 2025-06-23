import { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/use-click-outside'

type SearchAndDropdown1Props = {
  dropdownList: any[]
  value: number
  onChange: (id: number) => void
  selectedIds?: number[]
}

const SearchAndDropdown = ({
  dropdownList,
  value,
  onChange,
  selectedIds = [],
}: SearchAndDropdown1Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useClickOutside(wrapperRef as any, () => {
    setShowDropdown(false)
  })

  const lists = useMemo(() => {
    const queryLower = searchQuery.toLowerCase()
    return dropdownList?.filter((product) => {
      const matchesQuery =
        product.label.toLowerCase().includes(queryLower) ||
        product.sku.toLowerCase().includes(queryLower)

      const isNotSelected = !selectedIds.includes(product.id)

      return matchesQuery && isNotSelected
    })
  }, [dropdownList, searchQuery, selectedIds])

  const activeItem = useMemo(() => {
    return dropdownList?.find((el) => Number(el?.id) === Number(value))
  }, [value, dropdownList])

  const handleClickItem = (id: number) => {
    onChange(id)
    setShowDropdown(false)
  }

  return (
    <div
      ref={wrapperRef}
      className='relative flex h-[40px] w-full items-center'
    >
      {activeItem && !showDropdown ? (
        <div
          className={`${
            !activeItem.image && '!pl-0'
          } flex cursor-pointer items-center p-[6px]`}
          onClick={() => {
            setShowDropdown(true)
            setTimeout(() => {
              inputRef?.current?.focus()
            }, 50)
          }}
        >
          {activeItem.image ? (
            <img
              className='mr-[10px] h-[26px] w-[26px] rounded-[1px] object-cover'
              src={activeItem?.image}
              alt=''
            />
          ) : (
            <div className='mr-[2px]'>test</div>
          )}
          <div className='text-black2 flex flex-col items-start gap-1 transition-all group-hover:text-white'>
            <span className='line-clamp-1 text-left text-sm font-[600]'>
              {activeItem.label}
            </span>
            {/* <span className='text-left text-xs font-[400]'>
              {activeItem.productCode}
            </span> */}
            {activeItem?.qty && (
              <span className='text-primary text-left text-xs font-[400]'>
                Stock Qty ({activeItem?.qty})
              </span>
            )}
          </div>
        </div>
      ) : (
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='placeholder:text-vorpgraylight focus:border-vorpblue h-[40px] w-full rounded-[4px] p-[6px] pb-[20px] text-xs focus:border focus:outline-none'
          type='text'
          placeholder='Type or click to select an item'
          onClick={() => {
            setShowDropdown(true)
          }}
        />
      )}

      {showDropdown && (
        <ul className='scrollbar bg-background absolute top-[40px] left-0 z-[1000] max-h-[240px] min-h-[50px] w-full overflow-x-scroll shadow-[0px_6px_11px_0px_rgba(0,0,0,0.10)]'>
          {lists?.map((product, index) => (
            <li
              key={index}
              className='group hover:bg-primary relative z-[1000] flex w-full cursor-pointer items-center p-[10px] transition-all hover:text-white'
              onClick={() => {
                handleClickItem(product?.id)
              }}
            >
              {product.image ? (
                <img
                  className='mr-[10px] h-[26px] w-[26px] rounded-[1px] object-cover'
                  src={product.image}
                  alt=''
                />
              ) : (
                <div className='ml-[-5px]'>test</div>
              )}
              <div className='text-black2 flex flex-col items-start transition-all group-hover:text-white'>
                <span className='line-clamp-1 text-left text-xs font-[600]'>
                  {product.label}
                </span>
                <span className='text-xs font-[400]'>{product.sku}</span>
                {product?.qty && (
                  <span className='text-left text-xs font-[400]'>
                    Available Qty ({product?.qty})
                  </span>
                )}
              </div>
            </li>
          ))}
          {lists?.length === 0 && (
            <span className='text-black2 mt-[15px] block text-xs font-[400]'>
              No Product Found
            </span>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchAndDropdown
