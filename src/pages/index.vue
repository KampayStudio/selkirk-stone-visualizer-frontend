<script setup lang="ts">
import Footer from './landing-page/footer.vue'
import Section1 from './landing-page/section-1.vue'
import Section2 from './landing-page/section-2.vue'
import Section3 from './landing-page/section-3.vue'
import Section4 from './landing-page/section-4.vue'

const route = useRoute()
const router = useRouter()

if (localStorage.getItem('loggedIn') === '0') {
  console.log('hello')
  router.replace(route.query.to ? String(route.query.to) : '/login')
}
</script>

<template>
  <div>
    <!-- 1st Section -->
    <Section1 />

    <!-- 2nd Section -->
    <Section2 />

    <!-- 3rd Section -->
    <Section3 />

    <!-- 4th section -->
    <Section4 />

    <!-- Footer -->
    <Footer />
  </div>
</template>
