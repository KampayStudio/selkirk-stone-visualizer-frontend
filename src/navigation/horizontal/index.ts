import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'bx-home-alt' },
  },
  {
    title: 'Collection',
    to: { name: 'collection' },
    icon: { icon: 'bx-file-blank' },
  },
] as HorizontalNavItems
