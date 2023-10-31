<script setup lang="ts">
let props = defineProps<{ value: number }>()
let element = ref<HTMLElement | null>(null);

let pop = ref<boolean>(false);

watch(props, () => {
  pop.value = true;

  setInterval(() => {
    pop.value = false
  }, 200)
})

</script>

<template>
  <div v-if="value > 0" :class="{pop: pop}">
    {{ value }}
  </div>
</template>

<style scoped lang="scss">

.pop {
  color: red;
  animation: 0.2s ease-in-out pop;
}

@keyframes pop {
  from {
    scale: 1;
  }
  20% {
    scale: 2;
  }
  to {
    scale: 1;
  }
}
</style>