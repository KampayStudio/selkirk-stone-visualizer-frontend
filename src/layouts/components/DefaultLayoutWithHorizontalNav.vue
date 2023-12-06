<script lang="ts" setup>
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue'
import UserProfile from './UserProfile.vue'
import navItems from '@/navigation/horizontal'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { themeConfig } from '@themeConfig'

// Components
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

const { appRouteTransition } = useThemeConfig()
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
      <VBtn variant="text">
        Home
      </VBtn>
      <VBtn variant="text">
        Collection
      </VBtn>
      <VSpacer />
      <NavbarThemeSwitcher class="me-2" />
      <UserProfile />
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
