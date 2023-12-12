<script setup lang="ts">
import axios from '@axios'

const route = useRoute()
const router = useRouter()
const firstname = localStorage.getItem('first_name')
const lastname = localStorage.getItem('last_name')

const logout = async () => {
  try {
    // Call your API endpoint for logout
    // Replace 'your-logout-endpoint' with your actual logout API endpoint
    await axios.post('/logout/', {}, { withCredentials: true })

    // Clear client-side authentication state
    localStorage.removeItem('authToken')
    localStorage.removeItem('first_name')
    localStorage.removeItem('last_name')
    localStorage.removeItem('address')
    localStorage.removeItem('contact_number')
    localStorage.removeItem('email')

    // Redirect to login page or perform other actions after logout
    // For example, using Vue Router to navigate to the login page
    router.push('/login')
  }
  catch (error) {
    console.error('Logout failed:', error)

    // Handle any errors that occur during logout
    // Possibly show an error notification to the user
  }
}
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <!-- <VImg :src="avatar1" /> -->

      <VIcon
        icon="mdi-account-circle"
        size="2rem"
      />
      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->

          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VIcon
                      icon="mdi-account-circle"
                      size="2rem"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ `${firstname} ${lastname}` }}
            </VListItemTitle>
            <!-- <VListItemSubtitle>Admin</VListItemSubtitle> -->
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->

          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->

          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-cog"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            Logout
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
