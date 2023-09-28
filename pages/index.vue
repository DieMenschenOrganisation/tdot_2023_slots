<script setup lang="ts">

</script>

<template>
  <main>
    <div id="slots">
      <SlotLine
          :values="['2test','3test','4test','5test','2test','3test','4test','5test','2test','3test','4test','5test']"></SlotLine>
      <SlotLine
          :values="['2test','3test','4test','5test','2test','3test','4test','5test','2test','3test','4test','5test']"></SlotLine>
      <SlotLine
          :values="['2test','3test','4test','5test','2test','3test','4test','5test','2test','3test','4test','5test']"></SlotLine>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main {

  width: 100vw;
  height: 100vh;

  display: flex;

  justify-content: center;
  align-items: center;

  #slots {
    display: flex;
  }
}

</style>