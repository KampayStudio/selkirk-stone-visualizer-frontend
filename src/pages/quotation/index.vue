<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const items = ref([
  { requestNo: 12345, name: 'Kitchen', status: 'completed', date: '01/23/2012', remarks: 'hello' },
  { requestNo: 12345, name: 'Kitchen', status: 'completed', date: '01/23/2012', remarks: 'hello' },
  { requestNo: 12345, name: 'Kitchen', status: 'completed', date: '01/23/2012', remarks: 'hello' },
  { requestNo: 12345, name: 'Kitchen', status: 'completed', date: '01/23/2012', remarks: 'hello' },
])

const headers = [
  {
    title: 'Request No.',
    key: 'requestNo',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'Remarks',
    key: 'remarks',
  },
]
</script>

<template>
  <section class="max-section-width">
    <VCard>
      <VCardTitle class="d-flex justify-space-between pt-5">
        <div>
          <h4 class="text-h4 text-primary">
            Qoutation Status
          </h4>
        </div>
        <div class="d-flex gap-x-2">
          <VBtn variant="outlined">
            DELETE
          </VBtn>
          <VBtn>
            REQUEST
          </VBtn>
        </div>
      </VCardTitle>
      <VCardText>
        <VDataTable
          :items="items"
          :headers="headers"
        />
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin: 1rem;
  margin-inline: auto;
  max-inline-size: 1440px;;
}
</style>
