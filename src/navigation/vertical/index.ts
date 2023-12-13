import type { VerticalNavItems } from '@/@layouts/types'

// Fetch the auth token from local storage
const authToken = ref(localStorage.getItem('authToken'))

// Compute whether the user is authenticated
const isAuthenticated = computed(() => !!authToken.value)

// Define the navigation items for authenticated and unauthenticated users
const authenticatedNavItems: VerticalNavItems = [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'bx-home-alt' },
  },
  {
    title: 'Collection',
    to: { name: 'collection' },
    icon: { icon: 'bx-file-blank' },
    disable: true,
  },
]

const unauthenticatedNavItems: VerticalNavItems = [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'bx-home-alt' },
  },
]

// Export the appropriate navigation items based on the authentication state
export default isAuthenticated.value ? authenticatedNavItems : unauthenticatedNavItems
