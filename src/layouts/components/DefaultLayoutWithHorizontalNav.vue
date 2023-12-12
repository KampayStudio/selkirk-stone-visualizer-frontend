<script lang="ts" setup>
import UserProfile from './UserProfile.vue'
import navItems from '@/navigation/horizontal'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { themeConfig } from '@themeConfig'

// Components
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

const { appRouteTransition } = useThemeConfig()

const authToken = ref(localStorage.getItem('authToken'))

const isAuthenticated = computed(() => !authToken.value)
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        to="/"
        class="d-flex align-center pr-10"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />
      </RouterLink>
      <RouterLink to="/">
        <VBtn variant="text">
          Home
        </VBtn>
      </RouterLink>
      <RouterLink to="/collection">
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

    <!--
      <template #footer>
      <Footer />
      </template>
    -->

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>
