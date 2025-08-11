/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useAuth } from '@/features/auth/context/auth-context'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!token || !user)) {
      navigate({ to: '/sign-in' })
    }
  }, [loading, token, user, navigate])

  if (loading) return <FullPageSpinner /> // You can replace with a spinner

  return <>{children}</>
}

export const Route = createFileRoute('/_authenticated')({
  // beforeLoad: async ({ context: { auth } }: any) => {
  //   const { isAuthenticated } = auth
  //   if (!isAuthenticated) {
  //     throw redirect({
  //       to: '/login',
  //     })
  //   }
  //   // If authenticated, allow the route to continue
  //   return { auth }
  // },
  component: () => (
    <RequireAuth>
      <RouteComponent />
    </RequireAuth>
  ),
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
