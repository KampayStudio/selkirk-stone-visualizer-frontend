import type { VerticalNavItems } from '@/@layouts/types'

// Fetch the auth token from local storage
const authToken = ref(sessionStorage.getItem('authToken'))

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
    title: 'Sample Scenes',
    to: { name: 'sample-scenes' },
    icon: { icon: 'bx-landscape' },
  },
  {
    title: 'Collection',
    to: { name: 'collection' },
    icon: { icon: 'bx-folder' },
  },

]

const unauthenticatedNavItems: VerticalNavItems = [
  {
    title: 'Login',
    to: { name: 'login' },
    icon: { icon: 'bx-user' },
  },
  {
    title: 'Register',
    to: { name: 'register' },
    icon: { icon: 'bx-edit' },
  },
  { heading: 'Pages' },
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'bx-home-alt' },
  },
  {
    title: 'Sample Scenes',
    to: { name: 'sample-scenes' },
    icon: { icon: 'bx-file-blank' },
  },
]

// Export the appropriate navigation items based on the authentication state
export default isAuthenticated.value ? authenticatedNavItems : unauthenticatedNavItems
