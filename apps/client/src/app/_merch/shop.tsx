import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_merch/shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_merch/shop"!</div>
}
