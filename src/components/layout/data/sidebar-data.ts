import {
  IconBrowserCheck,
  IconCalendarMonth,
  IconCalendarTime,
  IconCategory,
  IconChecklist,
  IconCreditCardPay,
  IconDiscount,
  IconFileText,
  IconHelp,
  IconLayoutDashboard,
  IconList,
  IconNotification,
  IconPackage,
  IconPackages,
  IconPalette,
  IconPresentation,
  IconReport,
  IconSettings,
  IconShoppingBag,
  IconTool,
  IconUserCog,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: '',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Recent Budgets',
          url: '/recent-budgets',
          icon: IconPresentation,
        },
        {
          title: 'All Budgets',
          url: '/budgets',
          icon: IconList,
        },
         {
          title: 'Categories',
          url: '/categories',
          icon: IconCategory,
        },
        {
          title: 'Reports',
          icon: IconReport,
          items: [
            {
              title: 'Monthly',
              url: '/reports/monthly',
              icon: IconCalendarMonth,
            },
            {
              title: 'Yearly',
              url: '/reports/yearly',
              icon: IconCalendarTime,
            },
            {
              title: 'Custom',
              url: '/reports/custom',
              icon: IconCreditCardPay,
            },
          ],
        },
      ],
    },
  ],
}
