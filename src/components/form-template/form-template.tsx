import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  children: ReactNode
  className?: string
}

export const FormTemplate = ({ children, className }: SectionProps) => {
  return (
    <div className={cn('flex items-start gap-5', className)}>{children}</div>
  )
}

export const LeftSection = ({ children, className }: SectionProps) => {
  return (
    <div className={cn('flex w-2/3 flex-col gap-5', className)}>{children}</div>
  )
}

export const RightSection = ({ children, className }: SectionProps) => {
  return (
    <div className={cn('flex w-1/3 flex-col gap-5', className)}>{children}</div>
  )
}

export const FormWrapper = ({ children, className }: SectionProps) => {
  return (
    <div
      className={cn(
        'bg-background grid w-full grid-cols-2 items-start gap-5 border p-5 shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}

export const ButtonContainer = ({ children, className }: SectionProps) => {
  return (
    <div
      className={cn(
        'bg-background fixed bottom-0 flex w-full items-center gap-3 py-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export default FormTemplate
