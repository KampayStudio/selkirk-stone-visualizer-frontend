<script lang="ts" setup>
import type { ItemProps } from 'vuetify/composables/item'

interface Props {
  menuList?: ItemProps[]
  itemProps?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <IconBtn size="32">
    <VIcon icon="bx-dots-vertical-rounded" />

    <VMenu
      v-if="props.menuList"
      activator="parent"
    >
      <VList
        :items="props.menuList"
        :item-props="props.itemProps"
      />
    </VMenu>
  </IconBtn>
</template>
