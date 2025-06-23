import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchases/$id/detail/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/purchases/$id/detail/"!</div>
}
