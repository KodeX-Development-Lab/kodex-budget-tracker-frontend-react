import * as LucideIcons from 'lucide-react'

export default function LucideIconByName({ name, ...props }: { name: any }) {
  const str = name
  const IconComponent = LucideIcons[str.charAt(0).toUpperCase() + str.slice(1)]

  if (!IconComponent) {
    return null // or some fallback UI
  }

  return <IconComponent {...props} />
}
