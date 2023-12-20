<script setup lang="ts">
const selectedSection = ref()

const interior = ref([
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1675895102334-CF9QI5F538TL3NBBZUNU/Country+Cliffstone+-+Granite+Ridge+Interior.JPG?format=2500w',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577491237514-MSYQ5LOEEKXQ9MUAJSRT/Selkirk-Stone-Distributors-Calgary-Stone-Veneer-Manufactured-Interior-Fireplace.jpg?format=2500w',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQE1k_CajE7ZjA/feedshare-shrink_1280/0/1692044741633?e=1705536000&v=beta&t=k9bXeyWDXHMJ8QrOZnALpPWRSkom-6Mbm-MWplj_DhM',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQGNApxMpOgraQ/feedshare-shrink_1280/0/1692044741530?e=1705536000&v=beta&t=fT_6_0g6cUJISJMXOMX2WWbotgb1ygZYf_0UAxwaUqg',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQG0BxtD9yKZJQ/feedshare-shrink_1280/0/1692044741481?e=1705536000&v=beta&t=OcRTx3FhcF9VNF_QfLapgDp9-_w_OV13dwSdqIaKfpc',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
  {
    image: 'https://media.licdn.com/dms/image/D5622AQGNApxMpOgraQ/feedshare-shrink_1280/0/1692044741530?e=1705536000&v=beta&t=fT_6_0g6cUJISJMXOMX2WWbotgb1ygZYf_0UAxwaUqg',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
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
  <section class="max-section-width">
    <VRow>
      <VCol
        cols="12"
        md="6"
        class="d-flex flex-column gap-y-2"
      >
        <h3 class="text-h3 text-primary">
          Try Sample Scenes
        </h3>
        <p class="text-body-2">
          Selecting from our sample scenes below to start visualize our range of high-quality manufactured stone and brick veneers.
        </p>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          variant="outlined"
          :to="{ name: 'visualizer-upload' }"
        >
          Upload Photo
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard>
          <VCardText>
            <VTabs v-model="selectedSection">
              <VTab value="interior">
                Interior
              </VTab>
              <VTab value="exterior">
                Exterior
              </VTab>
              <VTab value="mantle">
                Non-Combustible Mantle
              </VTab>
            </VTabs>
            <VWindow v-model="selectedSection">
              <VWindowItem
                value="interior"
                style="padding: 1rem;"
              >
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in interior"
                    :key="i.image"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                    style="align-items: center;"
                  >
                    <div
                      class="image-mask image-container"
                      :to="{ name: 'forgot-password' }"
                    >
                      <RouterLink :to="{ name: 'visualizer' }">
                        <img :src="i.image">
                        <VCheckbox class="checkbox" />
                      </RouterLink>
                    </div>
                    <VLabel
                      class="text-body-2 "
                      style="font-size: .9rem;"
                    >
                      {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                    </VLabel>
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem
                value="exterior"
                style="padding: 1rem;"
              >
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
              </VWindowItem>
              <VWindowItem
                value="mantle"
                style="padding: 1rem;"
              >
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
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}

section{
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
</style>
