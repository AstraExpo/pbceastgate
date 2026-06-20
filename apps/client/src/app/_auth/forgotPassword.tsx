import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forgotPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/fogotpassword"!</div>
}
