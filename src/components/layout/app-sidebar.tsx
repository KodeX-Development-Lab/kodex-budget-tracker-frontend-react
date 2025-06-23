import { useGetAllEnums } from '@/graphql/queries/product.query'
import { useEnumStore } from '@/stores/enumStore'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' variant='sidebar' {...props}>
      <SidebarHeader className='animate-fade-in flex flex-row items-center gap-2 py-3'>
        {/* Logo Icon */}
        <div className='flex aspect-square h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[oklch(0.58_0.2_240)] via-[oklch(0.65_0.18_250)] to-[oklch(0.7_0.15_260)] text-xl font-bold text-white shadow-lg transition-transform duration-300 hover:rotate-6'>
          ⚡
        </div>
        {/* Brand Name */}
        {state !== 'collapsed' && (
          <h1 className='bg-gradient-to-r from-[oklch(0.58_0.2_240)] to-[oklch(0.7_0.15_260)] bg-clip-text text-lg font-extrabold tracking-tight text-transparent'>
            Blazepay
          </h1>
        )}
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
