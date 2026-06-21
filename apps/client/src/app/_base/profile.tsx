import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_base/profile/profile"!</div>
}
