import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/logIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/login"!</div>
}
