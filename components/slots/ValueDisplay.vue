<script setup lang="ts">
let props = defineProps<{ value: number }>()

let pop = ref<boolean>(false);

watch(props, () => {
  pop.value = true;

  setTimeout(() => {
    pop.value = false
  }, 200)
})

</script>

<template>
  <div v-if="value > 0">
    <div :class="{pop: pop}">
      {{ value }}
    </div>
  </div>
</template>

<style scoped lang="scss">

.pop {
  animation: 0.2s ease-in-out pop;
}

@keyframes pop {
  from {
    color: black;
    scale: 1;
  }
  20% {
    color: red;
    scale: 1.5;
  }
  to {
    color: black;
    scale: 1;
  }
}
</style>