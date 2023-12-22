<script setup lang="ts">
const props = defineProps(['image', 'selected-wall'])
const emit = defineEmits(['proceed'])

const stones = ref([
  {
    name: 'Aged Brick',
    image: '/temp/stones/aged_brick/Ashen.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/aged_brick/Ashen.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/aged_brick/Bisque.jpg',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/aged_brick/Brownstone.jpg',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/aged_brick/Coral.jpg',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/aged_brick/Ebony.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/aged_brick/Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Old Chicago',
        image: '/temp/stones/aged_brick/old_chicago.jpg',
        show: true,
      },
      {
        name: 'Oxford',
        image: '/temp/stones/aged_brick/Oxford.jpg',
        show: true,
      },
      {
        name: 'Winterton',
        image: '/temp/stones/aged_brick/Winterton.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Chiseled Limestone',
    image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/chiseled_limestone/Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/chiseled_limestone/Bisque.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/chiseled_limestone/Charcoal.jpg',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/chiseled_limestone/Conifer.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/chiseled_limestone/Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/chiseled_limestone/Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Sahara',
        image: '/temp/stones/chiseled_limestone/Sahara.jpg',
        show: true,
      },
      {
        name: 'Sandstone',
        image: '/temp/stones/chiseled_limestone/Sandstone.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Contemporary Brick',
    image: '/temp/stones/contemporary_brick/Ashen.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/contemporary_brick/CB_Ashen.jpg',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/contemporary_brick/CB_Brownstone.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/contemporary_brick/CB_Bisque.jpg',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/contemporary_brick/CB_Coral.jpg',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/contemporary_brick/CB_Ebony.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Country Cliffstone',
    image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/country_cliffstone/CC_Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/country_cliffstone/CC_Bisque.jpg',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/country_cliffstone/CC_Bow\ Valley.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/country_cliffstone/CC_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/country_cliffstone/CC_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/country_cliffstone/CC_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/country_cliffstone/CC_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/country_cliffstone/CC_Rundle.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Field Stone',
    image: '/temp/stones/field_stone/F_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/field_stone/F_Alpine.jpg',
        show: true,
      },
      {
        name: 'Aspen',
        image: '/temp/stones/field_stone/F_Aspen.jpg',
        show: true,
      },
      {
        name: 'Bitteroot',
        image: '/temp/stones/field_stone/F_Bitteroot.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/field_stone/F_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/field_stone/F_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/field_stone/F_Granite Ridge.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Glacier Stone',
    image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Aspen',
        image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/glacier_stone/GlacierStone_Biteroot.png',
        show: true,
      },
      {
        name: 'Northwest',
        image: '/temp/stones/glacier_stone/GlacierStone_Northwest\ Blend.png',
        show: true,
      },
    ],
  },
  {
    name: 'Mountain Ledge',
    image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/mountain_ledge/ML_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Cool River',
        image: '/temp/stones/mountain_ledge/ML_Cool\ River.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/mountain_ledge/ML_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango',
        image: '/temp/stones/mountain_ledge/ML_Durango.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/mountain_ledge/ML_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/mountain_ledge/ML_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rocky Mountain',
        image: '/temp/stones/mountain_ledge/ML_Rocky\ Mountain.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/mountain_ledge/ML_Rundle.jpg',
        show: true,
      },
      {
        name: 'Valley',
        image: '/temp/stones/mountain_ledge/ML_Valley.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Northen Ledgestone',
    image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alberta',
        image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/northern_ledgestone/NL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/northern_ledgestone/NL_Bisque.jpg',
        show: true,
      },
      {
        name: 'Bonner',
        image: '/temp/stones/northern_ledgestone/NL_Bonner.jpg',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/northern_ledgestone/NL_Bow\ Valley.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/northern_ledgestone/NL_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/northern_ledgestone/NL_Coal\ River.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/northern_ledgestone/NL_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/northern_ledgestone/NL_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/northern_ledgestone/NL_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/northern_ledgestone/NL_Harvest\ Blend.jpg',
        show: true,
      },
      {
        name: 'High Country',
        image: '/temp/stones/northern_ledgestone/NL_HIgh\ Country.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/northern_ledgestone/NL_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rocky Mountain',
        image: '/temp/stones/northern_ledgestone/NL_Rocky\ Mountain.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/northern_ledgestone/NL_Rundle.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Rustic Ledgestone',
    image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/rustic_ledgestone/RL_Biteroot.jpg',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/rustic_ledgestone/RL_Bonner\ Country.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/rustic_ledgestone/RL_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/rustic_ledgestone/RL_Coal\ River.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/rustic_ledgestone/RL_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/rustic_ledgestone/RL_Granite Ridge.jpg',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/rustic_ledgestone/RL_Harvest\ Blend.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/rustic_ledgestone/RL_Montana\ Slate.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Shadow Ledgestone',
    image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/shadow_ledgestone/SL_Biteroot.jpg',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/shadow_ledgestone/SL_Bonner\ Country.jpg',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/shadow_ledgestone/SL_Conifer.jpeg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/shadow_ledgestone/SL_Durango Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/shadow_ledgestone/SL_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/shadow_ledgestone/SL_Montana\ Slate.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Strip Ledge',
    image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/strip_ledge/SL_Bisque.jpg',
        show: true,
      },
      {
        name: 'Dark Ocean',
        image: '/temp/stones/strip_ledge/SL_Dark\ Ocean.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/strip_ledge/SL_Granite\ Ridge.jpg',
        show: true,
      },
    ],
  },

])

const canvasRefs = ref([])
const labelRefs = ref([])
const currentStone = ref()
const currentSection = ref('categories')
const selectedColor = ref()
const imageX = ref()
const imageY = ref()

const scaleShapeCoordinates = (shape, scaleX, scaleY) => {
  return shape.map(point => ({
    x: point.x * scaleX,
    y: point.y * scaleY,
  }))
}

const loadImagePattern = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.src = src
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
  })
}

const drawShapeOnCanvas = (canvas, shape, label) => {
  const context = canvas.getContext('2d')

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  shape.forEach(point => {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  })

  const width = maxX - minX
  const height = maxY - minY

  canvas.width = width
  canvas.height = height

  canvas.style.left = `${minX}px`
  canvas.style.top = `${minY}px`
  label.style.left = `${minX}px`
  label.style.top = `${minY}px`

  context.clearRect(0, 0, width, height)

  context.fillStyle = 'rgba(26, 78, 25, 1)'

  context.beginPath()
  shape.forEach((point, index) => {
    const x = point.x - minX
    const y = point.y - minY
    if (index === 0)
      context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.closePath()
  context.fill()
}

const drawShapeOnCanvasWithImage = (canvas, shape, label, img) => {
  const context = canvas.getContext('2d')

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  shape.forEach(point => {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  })

  const width = maxX - minX
  const height = maxY - minY

  canvas.width = width
  canvas.height = height

  canvas.style.left = `${minX}px`
  canvas.style.top = `${minY}px`
  label.style.left = `${minX}px`
  label.style.top = `${minY}px`

  context.clearRect(0, 0, width, height)

  if (img) {
    // Create an offscreen canvas to draw the scaled image
    const offscreenCanvas = document.createElement('canvas')
    const scale = 0.03 // Adjust this scale to control the size of the tiles

    offscreenCanvas.width = img.width * scale
    offscreenCanvas.height = img.height * scale

    const offscreenCtx = offscreenCanvas.getContext('2d')

    offscreenCtx.drawImage(img, 0, 0, offscreenCanvas.width, offscreenCanvas.height)

    // Create a pattern from the offscreen canvas
    const pattern = context.createPattern(offscreenCanvas, 'repeat')

    context.fillStyle = pattern
  }
  else {
    console.error('Image pattern is not available')

    return
  }

  context.beginPath()
  shape.forEach((point, index) => {
    const x = point.x - minX
    const y = point.y - minY
    if (index === 0)
      context.moveTo(x, y)

    else
      context.lineTo(x, y)
  })
  context.closePath()

  context.fill()
}

const drawShapes = async () => {
  const shape = props.image.wall_shape.shapes[props.selectedWall]

  const scaledShape = scaleShapeCoordinates(shape, imageX.value, imageY.value)

  if (!currentStone.value) {
    drawShapeOnCanvas(canvasRefs.value, scaledShape, labelRefs.value)
  }
  else {
    const imgPattern = await loadImagePattern(selectedColor.value.image)

    drawShapeOnCanvasWithImage(canvasRefs.value, scaledShape, labelRefs.value, imgPattern)
  }
}

onMounted(() => {
  const imgElement = document.querySelector('.image-container img')
  if (imgElement.complete) {
    // If image is already loaded

    imageX.value = imgElement.clientWidth / imgElement.naturalWidth
    imageY.value = imgElement.clientHeight / imgElement.naturalHeight
    drawShapes()
  }
  else {
    // Add event listener if the image is not loaded yet
    imgElement.addEventListener('load', drawShapes)
  }
})

const selectStone = (stone: any) => {
  currentStone.value = stone
  currentSection.value = 'colors'

  // drawShapes()
}

const selectColor = (stone: any) => {
  selectedColor.value = stone
  console.log(selectedColor.value)
  drawShapes()
}
</script>

<template>
  <VCardText>
    <VRow>
      <VCol
        cols="6"
        class="d-flex justify-center"
      >
        <div class="image-container">
          <img
            :src="image.image"
            class="img-background"
          >
          <canvas
            ref="canvasRefs"
            style="opacity: 100;"
            class="shape-canvas"
          />
          <div
            ref="labelRefs"
            class="box-index"
          >
            {{ props.selectedWall + 1 }}
          </div>
        </div>
      </VCol>

      <VCol
        class="d-flex align-center"
        cols="6"
      >
        <VWindow v-model="currentSection">
          <VWindowItem value="categories">
            <div>
              <VRow>
                <VCol>
                  <div
                    class="d-flex align-center text-gray text-body-2"
                    style="margin-block-end: 35px;"
                  >
                    <h6 class="text-body-2">
                      <b>Categories</b>
                    </h6>
                  </div>
                  <div>
                    <h4 class="text-h6 text-secondary ">
                      Wall {{ props.selectedWall + 1 }} Selected
                    </h4>
                  </div>
                  <h1 class="text-h4">
                    Choose Stone Category
                  </h1>
                  <p class="text-body-2 mt-3">
                    Please choose a stone category you want to apply on the wall.
                  </p>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  v-for="(stone, index) in stones"
                  :key="index"
                  style="position: relative; max-inline-size: 12rem;"
                  class="d-flex justify-center align-center"
                  @click="selectStone(stone)"
                >
                  <div style="position: absolute; z-index: 2; color: white;">
                    <b>{{ stone.name }}</b>
                  </div>
                  <VImg
                    :src="stone.image"
                    width="12rem"
                    height="5rem"
                    cover
                    style="border-radius: 10px;"
                  />
                </VCol>
              </VRow>
            </div>
          </VWindowItem>
          <VWindowItem value="colors">
            <div>
              <VRow>
                <VCol>
                  <div
                    class="d-flex align-center text-gray text-body-2"
                    style="margin-block-end: 35px;"
                  >
                    <h6 class="text-body-2">
                      <span @click="currentSection = 'categories'">Categories </span><VIcon icon="mdi-chevron-right" /> <b>Colors</b>
                    </h6>
                  </div>

                  <h4 class="text-h6 text-secondary">
                    Wall {{ props.selectedWall + 1 }} Selected
                  </h4>

                  <h1 class="text-h4">
                    Choose Stone Color
                  </h1>
                  <p class="text-body-2 mt-3">
                    Please choose only one stone color you want to apply on the wall.
                  </p>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  v-for="(stone, index) in currentStone.colors"
                  :key="index"
                  style="position: relative; max-inline-size: 12rem;"
                  class="d-flex justify-center align-center"
                  @click="selectColor(stone)"
                >
                  <div style="position: absolute; z-index: 2; color: white;">
                    <b>{{ stone.name }}</b>
                  </div>
                  <VImg
                    :src="stone.image"
                    width="12rem"
                    height="5rem"
                    cover
                    style="border-radius: 10px;"
                  />
                </VCol>
              </VRow>
            </div>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>

    <VRow>
      <VCol class="d-flex gap-x-3">
        <VBtn
          variant="outlined"
          @click="() => emit('proceed', 'selectWall')"
        >
          Back
        </VBtn>
        <VBtn @click="() => emit('proceed', 'main')">
          Next
        </VBtn>
      </VCol>
    </VRow>
  </VCardText>
</template>

<style lang="scss">
.image-container {
  position: relative;

  img{
    border-radius: 10px;
    inline-size: 100%;
    max-block-size:60vh;
  }
}

.box-index{
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #38A736;
  block-size: 2rem;
  color: white;
  inline-size: 2rem;
}
</style>
