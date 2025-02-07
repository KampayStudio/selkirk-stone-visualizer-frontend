<script lang="ts" setup>
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue'
import UserProfile from './UserProfile.vue'
import navItems from '@/navigation/horizontal'
import { useThemeConfig } from '@core/composable/useThemeConfig'

// Components
import { HorizontalNavLayout } from '@layouts'

const { appRouteTransition } = useThemeConfig()

const authToken = ref(sessionStorage.getItem('authToken'))

const isAuthenticated = computed(() => !authToken.value)
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        v-if="$route.path !== '/'"
        to="/"
        class="d-flex align-center pr-10"
      >
        <img
          :src="$vuetify.theme.name !== 'dark' ? '/image/selkirk-logo-full.png' : '/image/selkirk-logo-white.png' "
          style="inline-size: 9rem;"
        >
      </RouterLink>
      <a
        v-if="$route.path === '/'"
        href="https://www.selkirkstone.ca"
        class="d-flex align-center pr-10"
      >
        <img
          :src="$vuetify.theme.name !== 'dark' ? '/image/selkirk-logo-full.png' : '/image/selkirk-logo-white.png' "
          style="inline-size: 9rem;"
        >
      </a>
      <RouterLink to="/">
        <VBtn variant="text">
          Home
        </VBtn>
      </RouterLink>
      <RouterLink to="/sample-scenes">
        <VBtn variant="text">
          Sample Scenes
        </VBtn>
      </RouterLink>
      <RouterLink
        v-if="!isAuthenticated"
        to="/collection"
      >
        <VBtn variant="text">
          Collection
        </VBtn>
      </RouterLink>

      <VSpacer />
      <!-- <NavbarThemeSwitcher class="me-2" /> -->
      <div v-if="isAuthenticated">
        <RouterLink to="/login">
          <VBtn class="mr-3">
            Sign in
          </VBtn>
        </RouterLink>
        <RouterLink to="/register">
          <VBtn variant="outlined">
            Create Account
          </VBtn>
        </RouterLink>
      </div>
      <NavbarThemeSwitcher />

      <UserProfile v-if="!isAuthenticated" />
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>

<style lang="scss">
#main-logo{
  img {
    inline-size: 9rem;

  }

  #light{
    display: block;
  }

  #dark{
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    #light{
      display: none;
    }

    #dark{
      display: block;
    }
  }
}
</style>
