<template>
  <div id="app">
    <Test v-if="false"/>
    <TileMap />
  </div>
</template>

<script>
import Test from "@/components/Test.vue"
import TileMap from "@/components/TileMap.vue"

export default {
  name: "App",
  components: {
    Test,
    TileMap
  },
};
</script>