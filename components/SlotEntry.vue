<script setup lang="ts">
const props = defineProps<{ value: String }>()

let colors = ["red", "blue", "green", "yellow"]

</script>

<template>
  <div id="outer" :style="{background: colors[Math.round(Math.random() * (colors.length - 1))]}">
    {{ props.value }}
  </div>
</template>

<style lang="scss" scoped>
#outer {

  border-radius: 20px;

  height: 100px;
  width: 100px;

  display: flex;

  justify-content: center;
  align-items: center;

}
</style>