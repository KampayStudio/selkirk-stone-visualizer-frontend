<script setup lang="ts">
import axios from '@axios'

const route = useRoute()
const router = useRouter()
const firstname = sessionStorage.getItem('first_name')
const lastname = sessionStorage.getItem('last_name')

const logout = async () => {
  try {
    // Call your API endpoint for logout
    // Replace 'your-logout-endpoint' with your actual logout API endpoint
    await axios.post('/users/logout/', {}, { withCredentials: true })

    // Clear client-side authentication state
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('contact_number')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')

    // Redirect to login page or perform other actions after logout
    // For example, using Vue Router to navigate to the login page
    router.push('/login')
  }
  catch (error) {
    console.error('Logout failed:', error)

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('contact_number')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')

    router.push('/login')

    // Handle any errors that occur during logout
    // Possibly show an error notification to the user
  }
}

const profile = () => {
  router.push('/profile')
}

const settings = () => {
  router.push('/settings')
}

const quotation = () => {
  router.push('/quotation')
}

const collection = () => {
  router.push('/collection')
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

          <VListItem
            link
            @click="profile"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Collection -->

          <VListItem
            link
            @click="collection"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-image"
                size="22"
              />
            </template>

            <VListItemTitle>Collection</VListItemTitle>
          </VListItem>

          <!-- 👉 Quotation -->

          <VListItem
            link
            @click="quotation"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-list-box-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Quotation</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->

          <!--
            <VListItem
            link
            @click="settings"
            >
            <template #prepend>
            <VIcon
            class="me-2"
            icon="bx-cog"
            size="22"
            />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
            </VListItem>
          -->

          <!-- Divider -->

          <!-- 👉 Logout -->
          <VListItem
            link
            @click="logout"
          >
            Logout
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
