<script setup lang="ts">
let props = defineProps<{ value: number }>()

let pop = ref<boolean>(false);

watch(props, () => {
  pop.value = true;

  setTimeout(() => {
    pop.value = false
  }, 900)
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

div {
  font-size: 50px;
}

.pop {
  animation: 0.9s ease-in-out pop;
}

@keyframes pop {
  from {
    color: black;
    scale: 1;
  }
  20% {
    scale: 1.5;
    filter: drop-shadow(0px 0px 5px #00adb5);
  }
  to {
    color: black;
    scale: 1;
  }
}
</style>