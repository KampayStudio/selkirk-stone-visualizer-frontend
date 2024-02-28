<script setup lang="ts">
import Footer from './landing-page/footer.vue'
import Section1 from './landing-page/section-1.vue'
import Section2 from './landing-page/section-2.vue'
import Section3 from './landing-page/section-3.vue'
import Section4 from './landing-page/section-4.vue'
import VerifyEmailDialog from '@/layouts/components/email/VerifyEmailDialog.vue'
import VerificationDialog from '@/layouts/components/email/VerificationDialog.vue'

const route = useRoute()
const router = useRouter()
const VerificationDialogRef = ref(null)
const VerifyEmailDialogRef = ref(null)

if (localStorage.getItem('loggedIn') === '0')
  router.replace(route.query.to ? String(route.query.to) : '/login')

onMounted(() => {
  if (window.location.href.split('?').length > 1) {
    if (window.location.href.split('?')[1].split('=')[0] === 'verified')
      VerificationDialogRef.value.openDialog()
    if (window.location.href.split('?')[1].split('=')[0] === 'to_verify')
      VerifyEmailDialogRef.value.openDialog()
  }
})
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

    <!-- Email Dialog -->
    <VerificationDialog ref="VerificationDialogRef" />

    <VerifyEmailDialog ref="VerifyEmailDialogRef" />
  </div>
</template>
