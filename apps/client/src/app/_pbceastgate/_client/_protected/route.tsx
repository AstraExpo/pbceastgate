import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pbceastgate/_client/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_pbceastgate/_client/_protected"!</div>
}
