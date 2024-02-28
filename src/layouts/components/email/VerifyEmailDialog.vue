<script setup lang="ts">
import SnackBar from '../SnackBar.vue'
import axiosIns from '@/plugins/axios'

const isDialogOpen = ref(false)
const loading = ref(false)
const SnackBarRef = ref(null)

const route = useRoute()
const router = useRouter()

const openDialog = () => {
  isDialogOpen.value = true
}

const verify = async () => {
  loading.value = true
  try {
    const response = await axiosIns.post(`/users/email-verification/${window.location.href.split('?')[1].split('&')[1].split('=')[1]}/${window.location.href.split('?')[1].split('&')[2].split('=')[1]}/`)

    console.log(response)
    isDialogOpen.value = !isDialogOpen
    router.replace(route.query.to ? String(route.query.to) : '/?verified=true')
  }
  catch (e) {
    console.log(e.response.data.message)
    SnackBarRef.value.show('error', e.response.data.message)
  }
  loading.value = false
}

defineExpose({ openDialog })
</script>

<template>
  <div>
    <VDialog v-model="isDialogOpen">
      <VCard
        class="text-center px-10 py-6 mx-auto"
        style="min-inline-size: 300px;"
      >
        <VCardText>
          <VBtn
            icon
            variant="outlined"
            color="success"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl"><VIcon icon="bx-check" /></span>
          </VBtn>

          <h6 class="text-lg font-weight-medium">
            Click to Verify
          </h6>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <VBtn
            :loading="loading"
            variant="outlined"
            @click="() => {
              verify()
            }"
          >
            Verify
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <SnackBar ref="SnackBarRef" />
  </div>
</template>
