import {
  IconBrowserCheck,
  IconChecklist,
  IconDiscount,
  IconFileText,
  IconHelp,
  IconLayoutDashboard,
  IconNotification,
  IconPackage,
  IconPalette,
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
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        // {
        //   title: 'Apps',
        //   url: '/apps',
        //   icon: IconPackages,
        // },
        // {
        //   title: 'Chats',
        //   url: '/chats',
        //   badge: '3',
        //   icon: IconMessages,
        // },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: IconUsers,
        // },
      ],
    },
    {
      title: 'Inventory',
      items: [
        {
          title: 'Products',
          icon: IconShoppingBag,
          items: [
            {
              title: 'All Products',
              url: '/products',
            },
            {
              title: 'Categories',
              url: '/products/categories',
            },
            {
              title: 'Brands',
              url: '/products/brands',
            },
            {
              title: 'Units',
              url: '/products/units',
            },
          ],
        },
        {
          title: 'Purchases',
          icon: IconPackage,
          items: [
            {
              title: 'All Purchases',
              url: '/purchases',
            },
            {
              title: 'Suppliers',
              url: '/purchases/suppliers',
            },
            {
              title: 'Purchase Returns',
              url: '/purchases/purchase-returns',
            },
          ],
        },
        {
          title: 'Sales',
          icon: IconDiscount,
          items: [
            {
              title: 'All Sales',
              url: '/sales',
            },
            {
              title: 'Customers',
              url: '/sales/customers',
            },
            {
              title: 'Sales Returns',
              url: '/sales/sale-returns',
            },
          ],
        },
        {
          title: 'Reports',
          icon: IconFileText,
          items: [
            {
              title: 'Daily Sales Report',
              url: '/products',
            },
            {
              title: 'Purchase Report',
              url: '/products/categories',
            },
            {
              title: 'Inventory Report',
              url: '/products/categories',
            },
            {
              title: 'Profit & Loss',
              url: '/products/categories',
            },
            {
              title: 'Low Stock Alert',
              url: '/products/categories',
            },
          ],
        },
        // {
        //   title: 'Settings',
        //   icon: IconSettings,
        //   items: [
        //     {
        //       title: 'Company Info',
        //       url: '/products',
        //     },
        //     {
        //       title: 'Tax Settings',
        //       url: '/products/categories',
        //     },
        //     {
        //       title: 'User Roles & Permissions',
        //       url: '/products/categories',
        //     },
        //     {
        //       title: 'Backup / Restore',
        //       url: '/products/categories',
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
