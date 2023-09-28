<script setup lang="ts">
const props = defineProps<{ value: String }>()
</script>

<template>
  <div id="outer">
    {{ props.value }}
  </div>
</template>

<style lang="scss" scoped>
#outer {

  border-radius: 20px;

  height: 100px;
  width: 100px;

  background: darkslategray;

  display: flex;

  justify-content: center;
  align-items: center;

}
</style>