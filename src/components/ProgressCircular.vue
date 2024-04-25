<template>
  <v-progress-circular
    v-if="IsLoading"
    :size="85"
    :width="11"
    color="purple"
    class="load"
    indeterminate
  />
</template>

<script lang="ts" setup>
interface Props {
  IsLoading: boolean
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.load {
  // z-index: auto;
  // position: absolute;
  // bottom: 5%;
  // width: 150px;
}
</style>