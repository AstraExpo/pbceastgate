import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pbceastgate/_admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_pbceastgate/_admin"!</div>
}
