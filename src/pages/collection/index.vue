<script setup lang="ts">
const selectedItem = ref(['Interior', 'Exterior', 'Non-Combustible Mantle'])
const items = ['Interior', 'Exterior', 'Non-Combustible Mantle']

const interior = ref([
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1675895102334-CF9QI5F538TL3NBBZUNU/Country+Cliffstone+-+Granite+Ridge+Interior.JPG?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577491237514-MSYQ5LOEEKXQ9MUAJSRT/Selkirk-Stone-Distributors-Calgary-Stone-Veneer-Manufactured-Interior-Fireplace.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQE1k_CajE7ZjA/feedshare-shrink_1280/0/1692044741633?e=1705536000&v=beta&t=k9bXeyWDXHMJ8QrOZnALpPWRSkom-6Mbm-MWplj_DhM',
    area: 23,
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQGNApxMpOgraQ/feedshare-shrink_1280/0/1692044741530?e=1705536000&v=beta&t=fT_6_0g6cUJISJMXOMX2WWbotgb1ygZYf_0UAxwaUqg',
    area: 23,
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQG0BxtD9yKZJQ/feedshare-shrink_1280/0/1692044741481?e=1705536000&v=beta&t=OcRTx3FhcF9VNF_QfLapgDp9-_w_OV13dwSdqIaKfpc',
    area: 23,
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQGNApxMpOgraQ/feedshare-shrink_1280/0/1692044741530?e=1705536000&v=beta&t=fT_6_0g6cUJISJMXOMX2WWbotgb1ygZYf_0UAxwaUqg',
    area: 23,
  },

])

const exterior = ref([
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1679522155374-P0K6I9ZV5NE3WNOL0RMB/Contemporary+Brick+-+Bisque.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1679522171990-R53XLBLGO6ROCR19A1Y0/Contemporary+Brick+-+Bisque+2.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577486100976-WV26OTX1GUIZ54J2KUE1/Selkirk-Stone-Distributors-Stone-Veneer-Calgary-Northern-Ledgestone-Bonner-County.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577486100987-LVAT4I4GT0GV9K43RNLB/Selkirk-Stone-Distributors-Stone-Veneer-Model-Home-Calgary-Edmonton-Red-Deer.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577486104363-WSXBOXFAVDFMDUHB614Y/Selkirk-Stone-Manufactured-Stone-Veneer-Calgary-Edmonton-Northern-Ledgestone-Coal-River.jpg?format=2500w',
    area: 23,
  },

  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577486254752-QV1QGOUE6MX0BSRY7GCA/Selkirk-Stone-Distributors-Stone-Veneer-Commercial-Exterior.jpg?format=2500w',
    area: 23,
  },
])

const mantle = ref([
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663878393035-XHO7B26U4TWBV70E5TU2/ML+Bow+Valley+%2B+W.+Grey+Mantle.jpg?format=1500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663878451174-WN84Q0HHJRYJ4BDROVBB/CC+Granite+Ridge+%2B+R.+Brown+Mantle.jpg?format=1500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663878444519-SEV5L46A9N0T91LUA5QX/NL+Rocky+Mtn+%2B+R.+Brown+Mantle.jpg?format=1500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663878485691-96E9CAWCDGRRMAAUXFWM/ML+Driftwood+2%2B+R.+Brown+Mantle.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663876667409-C24BDEMOU1TRPVTI72X3/ML+Driftwood+2%2B+R.+Brown+Mantle.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663876765828-YMOMW3YB8X5EQXFFC5O6/CC+Granite+Ridge.jpg?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663876782192-2KTOE85U3LAUWRJV7SEU/GS+Aspen+1.JPG?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1675895102334-CF9QI5F538TL3NBBZUNU/Country+Cliffstone+-+Granite+Ridge+Interior.JPG?format=2500w',
    area: 23,
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1663876850189-6WH437WPRGZUOHFI8098/NL+Alpine+%2B+R.+Brown+Mantle.jpg?format=2500w',
    area: 23,
  },

])
</script>

<template>
  <section
    id="my-collection-section"
    class="max-section-width"
  >
    <VRow class="d-flex">
      <VCol>
        <h3 class="text-primary text-h4">
          My Collection
        </h3>
      </VCol>
      <VCol
        class="d-flex"
        style="justify-content: end;"
      >
        <div class="d-flex gap-x-2 my-auto">
          <VBtn size="small">
            Try Sample Scenes
          </VBtn>
          <VBtn size="small">
            Upload Photo
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <div>
      <p>Added here are the generated images that you add to ‘Collection’</p>
    </div>
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn size="small">
              Generate Report
            </VBtn>
            <VBtn
              variant="text"
              size="small"
            >
              Delete
            </VBtn>
          </VCol>
          <VCol cols="3">
            <VCombobox
              v-model="selectedItem"
              :items="items"
              density="compact"
              label="Filter"
              multiple
            />
          </VCol>
        </VRow>

        <div v-if="selectedItem.includes('Interior')">
          <VCheckbox
            label="Interior"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in interior"
                :key="i.image"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div class="image-mask image-container">
                  <img :src="i.image">
                  <VCheckbox class="checkbox" />
                </div>
                <VLabel
                  class="text-p "
                  style=" font-size: .9rem; margin-block-start: .4rem;"
                >
                  {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                </VLabel>
              </VCol>
            </VRow>
          </VContainer>
        </div>
        <div v-if="selectedItem.includes('Exterior')">
          <VCheckbox
            label="Exterior"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in exterior"
                :key="i.image"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div class="image-mask image-container">
                  <img :src="i.image">
                  <VCheckbox class="checkbox" />
                </div>
                <VLabel
                  class="text-p "
                  style=" font-size: .9rem; margin-block-start: .4rem;"
                >
                  {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                </VLabel>
              </VCol>
            </VRow>
          </VContainer>
        </div>
        <div v-if="selectedItem.includes('Non-Combustible Mantle')">
          <VCheckbox
            label="Non-Combustible Mantle"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in mantle"
                :key="i.image"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div class="image-mask image-container">
                  <img :src="i.image">
                  <VCheckbox class="checkbox" />
                </div>
                <VLabel
                  class="text-p "
                  style=" font-size: .9rem; margin-block-start: .4rem;"
                >
                  {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                </VLabel>
              </VCol>
            </VRow>
          </VContainer>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}

#my-collection-section{
  padding: 2rem;
}

.image-mask {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  block-size: 8rem;
  inline-size: 12rem;

  img {
    block-size: auto;
    inline-size: 100%;
  }
}

.image-container{
  position: relative;

  .checkbox{
    position:absolute;
    color: white;
    inset-block-start: .2rem;
    inset-inline-end: .5rem;
  }
}
</style>
