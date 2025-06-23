/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { uploadFile } from '@/config/file-upload'
import { X } from 'lucide-react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const ItemType = 'IMAGE'

const ImageItem = ({
  url,
  index,
  moveImage,
  removeImage,
}: {
  url: string
  index: number
  moveImage: (from: number, to: number) => void
  removeImage: (index: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current || item.index === index) return
      moveImage(item.index, index)
      item.index = index
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center gap-2 rounded-md border p-2 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <DragHandleDots2Icon />
      <img src={url} alt={url} className='h-10 w-10 rounded-md object-cover' />
      <div className='text-muted-foreground max-w-[200px] truncate text-sm'>
        {url}
      </div>
      <button onClick={() => removeImage(index)} className='ml-auto'>
        <X width={12} />
      </button>
    </div>
  )
}

const MultipleImageUpload = ({ name }: { name: string }) => {
  const { control, watch, setValue } = useFormContext<any>()
  const images = watch(name) || []
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const moveImage = (from: number, to: number) => {
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setValue(name, updated)
  }

  const removeImage = (index: number) => {
    const updated = images.filter((_: File, i: number) => i !== index)
    setValue(name, updated)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem className='w-full space-y-2'>
            <FormLabel>Product Images</FormLabel>
            {images.length > 0 ? (
              <div className='flex flex-col gap-2'>
                {images.map((url: string, index: number) => (
                  <ImageItem
                    key={index}
                    url={url}
                    index={index}
                    moveImage={moveImage}
                    removeImage={removeImage}
                  />
                ))}
              </div>
            ) : (
              <div className='border-input relative flex w-full items-center gap-2 rounded-md border p-3 text-sm'>
                No images added
              </div>
            )}
            <FormControl>
              <div>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  // onChange={(e) => {
                  //   const files = e.target.files
                  //   if (files) {
                  //     setValue('images', [...images, ...Array.from(files)], {
                  //       shouldValidate: true,
                  //       shouldDirty: true,
                  //     })
                  //   }
                  // }}
                  onChange={async (e) => {
                    const files = e.target.files
                    if (files && files.length > 0) {
                      const newImages = [...images]

                      for (const file of files) {
                        try {
                          const res = await uploadFile(file)
                          newImages.push(res.url)
                        } catch (error) {
                          console.error('Error uploading file:', error)
                        }
                      }

                      setValue(name, newImages, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  }}
                  className='hidden'
                  ref={fileInputRef}
                />
                <Button
                  type='button'
                  className='w-fit'
                  size='sm'
                  onClick={() => fileInputRef.current?.click()}
                >
                  + Add New
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </DndProvider>
  )
}

export default MultipleImageUpload
